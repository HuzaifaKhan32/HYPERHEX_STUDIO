import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0b0f10] text-[#e0f7fa] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#15b6e8]/30 bg-[#15b6e8]/10 px-4 py-2 text-xs font-semibold text-[#15b6e8]">
          404 Error
        </div>
        <h1 className="text-6xl font-black text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-[#a0b0b5] text-sm leading-relaxed">
          The stage or environment you are looking for has been moved or does not exist in our digital system.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#15b6e8] text-[#0b0f10] font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(21,182,232,0.4)]"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
