'use client';

// Social media links with hover animations
import { motion } from 'framer-motion';

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterSocialLinksProps {
  socialLinks: SocialLink[];
}

export default function FooterSocialLinks({ socialLinks }: FooterSocialLinksProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      {socialLinks.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.96 }}
          className="group relative flex items-center justify-between gap-6 px-8 py-4 transition-all duration-200 ease-out"
          style={{
            backgroundColor: 'rgb(244, 244, 245)',
            borderRadius: '24px',
            boxShadow:
              'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
            opacity: 1,
          }}
        >
          <div
            style={
              {
                '--framer-link-text-color': 'rgb(0, 153, 255)',
              } as React.CSSProperties
            }
          >
            <span
              className="font-semibold text-[15px] tracking-tight transition-colors group-hover:text-[rgb(0,153,255)]"
              style={{ color: '#18181B' }}
            >
              {social.label}
            </span>
          </div>

          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center transition-all duration-200 group-hover:scale-105 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-white"
            style={{
              backgroundColor: 'rgb(39, 39, 39)',
              borderRadius: '100%',
              boxShadow:
                'rgba(0, 0, 0, 0.12) 0px 2.77px 2.21px 0px, rgba(0, 0, 0, 0.14) 0px 3px 3px 0px, rgba(0, 0, 0, 0.15) 0px 100px 80px 0px, rgba(0, 0, 0, 0.15) 0px 41.78px 33.42px 0px, rgba(0, 0, 0, 0.14) 0px 22.34px 17.87px 0px, rgba(0, 0, 0, 0.14) 0px 12.52px 10.02px 0px, rgba(0, 0, 0, 0.13) 0px 6.65px 5.32px 0px, rgba(0, 0, 0, 0.12) 0px 2.77px 2.21px 0px, rgba(255, 255, 255, 0.3) 0px 1px 0px 0px inset, rgb(8, 8, 8) 0px -3px 0px 0px inset',
              opacity: 1,
            }}
          >
            {social.icon}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
