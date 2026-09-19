import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Note: In-memory rate limiting resets on cold starts on Vercel serverless functions.
// If spam becomes a real problem later, upgrade to Upstash Redis (@upstash/ratelimit) or Cloudflare Turnstile for persistent rate limiting and bot protection.
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp.trim();
  }
  return '127.0.0.1';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Rate Limiting check (max 5 submissions per IP per 10 minutes)
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, message, website } = body || {};

    // Anti-spam honeypot check: If the hidden 'website' field is filled, silently return success (200)
    if (website && typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message is required.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured in environment variables.');
      return NextResponse.json(
        { error: 'Server misconfiguration. Resend API key missing.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    // Must match your Resend account email — only this address is allowed
    // as a recipient while using the default onboarding@resend.dev sender
    // (no verified domain yet). Update once a domain is verified.
    const recipientEmail = 'hzaifandeem@gmail.com';

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [recipientEmail],
      replyTo: email.trim(),
      subject: `New contact form submission from ${name.trim()}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #15b6e8; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h2 style="color: #ffffff; margin: 0;">New Contact Form Submission</h2>
            </div>
            <div style="border: 1px solid #e0e0e0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px; background-color: #f9f9f9;">
              <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
              <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email.trim())}">${escapeHtml(email.trim())}</a></p>
              ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone.trim())}</p>` : ''}
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border-left: 4px solid #15b6e8; white-space: pre-wrap;">${escapeHtml(message.trim())}</div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to send email via Resend.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 200 });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending your message.' },
      { status: 500 }
    );
  }
}
