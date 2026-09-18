// Server Component - Testimonials section
// Client carousel handles auto-scroll and drag interactions

import TestimonialsCarousel from './TestimonialsCarousel';

const TESTIMONIALS_DATA = [
  {
    id: '1',
    quote: 'Working with HyperHex transformed our interactive 3D pipeline completely. Conversions shot up 300%.',
    author: 'Alex Turner',
    role: 'Founder, Voxel Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '2',
    quote: "The procedural shaders and real-time canvas integration exceeded our client's highest expectations.",
    author: 'James Mitchell',
    role: 'CEO, Novara Studio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '3',
    quote: 'They captured our brand identity instantly and engineered a web experience that feels alive.',
    author: 'Sofia Rahman',
    role: 'Design Director, Luma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '4',
    quote: 'Unmatched speed and technical precision. The WebGL performance across mobile is rock solid.',
    author: 'David Chen',
    role: 'VP Engineering, Apex',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '5',
    quote: 'HyperHex delivered complex 3D assets seamlessly integrated into Next.js within record timelines.',
    author: 'Elena Rostova',
    role: 'Product Lead, Kinetic',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '6',
    quote: 'The tactile UI polish and custom shaders gave our launch campaign the edge it needed.',
    author: 'Marcus Vance',
    role: 'Creative Director, Synth',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  },
];

export default function TestimonialsServer() {
  return (
    <section
      className="w-full py-10 md:py-16 bg-[#FFFFFF] text-[#161d1e] overflow-hidden select-none"
      style={{ fontFamily: 'var(--font-zalando-expanded, sans-serif)' }}
    >
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none mx-auto px-5 lg:px-16 2xl:px-24 flex flex-col">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-8">
          <div
            className="inline-flex w-fit items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-[#3b494c] transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: 'var(--token-5c4bbf1d-7534-4d20-87a6-b0deb15d1586, rgb(245, 245, 245))',
              borderRadius: '8px',
              boxShadow: 'rgba(0, 0, 0, 0.14) 0px 3px 3px 0px, rgba(0, 0, 0, 0.12) 0px 2.77px 2.21px 0px, rgb(233, 233, 233) 0px -3px 0px 0px inset',
              opacity: 1,
            }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#15b6e8]" />
            <span>Testimonials</span>
          </div>

          <h2 className="flex flex-col items-center text-5xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black tracking-tight">
            <span className="text-[#161d1e] tracking-wide">Don't Just Take</span>
            <span className="tracking-wider bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent">Our Word</span>
          </h2>
        </div>

        {/* Carousel */}
        <TestimonialsCarousel testimonials={TESTIMONIALS_DATA} />

      </div>
    </section>
  );
}
