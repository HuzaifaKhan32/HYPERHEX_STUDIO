// Server Component - AboutUs section
// Client components handle animations, server renders static structure

import Image from 'next/image';
import Button3D from './Button3D';
import AboutUsHeaderAnimated from './AboutUsHeaderAnimated';
import AboutUsCounter from './AboutUsCounter';
import AboutUsGlobeParallax from './AboutUsGlobeParallax';
import AboutUsCardReveal from './AboutUsCardReveal';

const skeuomorphicCardStyle = {
  backgroundColor: 'rgb(244, 244, 245)',
  borderRadius: '24px',
  boxShadow:
    'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
};

export default function AboutUsServer() {
  return (
    <section className="w-full bg-[#f4fafd] text-[#161d1e] antialiased" id="about">
      <div className="mx-auto flex max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-none flex-col gap-4 md:gap-8 px-5 py-10 md:py-16 lg:px-16 2xl:px-24">

        {/* Animated header */}
        <AboutUsHeaderAnimated />

        {/* Main content grid */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">

          {/* Left: Hero dark card with globe */}
          <AboutUsCardReveal className="relative flex h-full min-h-[380px] md:min-h-[400px] lg:min-h-[450px] 2xl:min-h-[500px] flex-col overflow-hidden rounded-[32px] bg-[#0d0f12] shadow-[0_20px_50px_rgba(0,0,0,0.3)] lg:col-span-7">

            {/* Background texture */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/logo/globe-background.avif"
                alt="Card background lighting texture"
                fill
                priority
                className="object-cover opacity-100"
              />
            </div>

            {/* Ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#15b6e8]/15 via-transparent to-transparent pointer-events-none" />

            {/* Card content */}
            <div className="relative z-10 flex w-full flex-col items-center p-8 pt-10 text-center md:p-12 2xl:pt-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#15b6e8] shadow-[0_0_10px_#15b6e8]" />
                <span className="text-xs font-medium tracking-wide text-white 2xl:text-sm">
                  Available for Worldwide Projects
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight text-white md:text-3xl 2xl:text-4xl">
                Based in <span className="text-[#15b6e8]">Pakistan</span>, Serving Global Brands
              </h3>

              <div className="mt-6">
                <Button3D href="#contact">Start a Project</Button3D>
              </div>
            </div>

            {/* Globe with scroll parallax + city markers */}
            <AboutUsGlobeParallax />

          </AboutUsCardReveal>

          {/* Right: Metric cards */}
          <div className="flex flex-col gap-6 lg:col-span-5">

            {/* Trust metric card */}
            <AboutUsCardReveal
              delay={0.1}
              className="relative flex min-h-[240px] 2xl:min-h-[300px] flex-col justify-between overflow-hidden p-8 2xl:p-10 transition-all duration-200"
              style={skeuomorphicCardStyle}
            >
              <p className="relative z-10 text-base md:text-lg 2xl:text-xl font-medium leading-relaxed text-[#161d1e]">
                Trusted by 55+ clients worldwide with premium 3D solutions.
              </p>

              <div className="relative z-10 mt-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl text-[#15b6e8]">★</span>
                  <span className="text-sm font-bold tracking-tight text-[#161d1e]">
                    Client Satisfaction
                  </span>
                </div>
                <div className="flex gap-1 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className="rounded-sm bg-[#161d1e] px-1 py-0.5 text-white"
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated counter watermark with gradient shading */}
              <div className="pointer-events-none absolute right-2 bottom-2 select-none text-[90px] 2xl:text-[110px] font-black leading-none bg-gradient-to-b from-[#bac9cc]/50 via-[#bac9cc]/30 to-transparent bg-clip-text text-transparent">
                <AboutUsCounter from={19} to={55} />+
              </div>
            </AboutUsCardReveal>

            {/* Testimonial card */}
            <AboutUsCardReveal
              delay={0.2}
              className="flex min-h-[240px] 2xl:min-h-[300px] flex-col md:flex-row items-start md:items-center text-left gap-6 p-8 2xl:p-10 transition-all duration-200"
              style={skeuomorphicCardStyle}
            >
              <div className="relative w-32 h-48 md:w-36 md:h-52 2xl:w-40 2xl:h-56 shrink-0 overflow-hidden rounded-2xl shadow-md mx-auto md:mx-0">
                <Image
                  src="/logo/hunain.webp"
                  alt="Hunain Soomro - CEO of HyperHex Studio"
                  fill
                  sizes="(max-width: 768px) 128px, (max-width: 1536px) 144px, 160px"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="flex flex-col items-start gap-3">
                <span className="inline-block text-4xl leading-none font-serif rotate-180 text-[#bac9cc]">
                  &ldquo;
                </span>
                <p className="-mt-3 text-sm md:text-base 2xl:text-lg font-bold leading-relaxed text-[#161d1e]">
                  High-end 3D visualization and spatial web design bridge the gap between imagination and reality.
                </p>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-sm font-bold text-[#161d1e]">
                    Hunain Soomro
                  </span>
                  <span className="text-xs text-[#3b494c]">
                    Founder
                  </span>
                </div>
              </div>
            </AboutUsCardReveal>

          </div>
        </div>

      </div>
    </section>
  );
}
