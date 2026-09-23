import Link from 'next/link';
import SectionPill from '@/components/ui/SectionPill';

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md p-8 text-center space-y-6" style={skeuomorphicCardStyle}>
        <SectionPill label="404 Error" className="mx-auto" />
        <h1
          className="text-4xl sm:text-5xl font-black text-[#161d1e] tracking-tight"
          style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
        >
          Page Not Found
        </h1>
        <p className="text-[#3b494c] text-sm leading-relaxed font-medium">
          The stage or environment you are looking for has been moved or does not exist in our digital system.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#15b6e8] text-white font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(21,182,232,0.4)]"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
