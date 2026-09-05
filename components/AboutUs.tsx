'use client';

import Image from 'next/image';
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Button3D from './Button3D';

function Counter({ from = 19, to = 120 }: { from?: number; to?: number }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(nodeRef, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!isInView) return;

        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(from, to, {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
            onUpdate(value) {
                node.textContent = Math.round(value).toString();
            },
        });

        return () => controls.stop();
    }, [isInView, from, to]);

    return <span ref={nodeRef}>{from}</span>;
}

// Interactive city dots mapped over the Pakistan region on the globe projection
const PAKISTAN_CITIES = [
    { name: 'Peshawar', top: '25%', left: '42.5%' }, // upper-left  — NW corner
    { name: 'Islamabad', top: '35%', left: '44%' }, // upper-center — slightly right & below Peshawar
    { name: 'Lahore', top: '18%', left: '47.5%' }, // upper-right  — far right
    { name: 'Karachi', top: '18%', left: '34%' }, // bottom-left  — wide south base
];

// Shared reveal variants for this section's header + the two right-column
// cards. Only opacity/y are animated (compositor-friendly). This section
// previously had no entrance animation at all on these elements — they just
// appeared fully rendered on scroll with no reveal.
const revealVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
};

// Header uses a staggered container so the badge and heading lines reveal
// in sequence rather than as one flat block.
const headerContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export default function AboutUsSection() {
    const skeuomorphicCardStyle = {
        backgroundColor: 'rgb(244, 244, 245)',
        borderRadius: '24px',
        boxShadow:
            'rgba(255, 255, 255, 0.6) 0px 4px 0px 0px inset, rgba(0, 0, 0, 0.05) 0px -8px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 3px 3px 0px, rgba(0, 0, 0, 0.06) 0px 7.77px 16px 0px',
    };

    const cardRef = useRef<HTMLDivElement>(null);
    const [activeCity, setActiveCity] = useState<string | null>(null);

    // Scroll animation bound to the hero card element
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });

    // Smooth Y-axis entry transform for the globe on scroll
    const globeY = useTransform(scrollYProgress, [0, 0.5], ['82%', '59%']);

    return (
        <section className="w-full bg-[#f4fafd] text-[#161d1e] antialiased" id="about">
            <div className="mx-auto flex max-w-[1280px] 2xl:max-w-[1600px] flex-col gap-8 px-5 py-16 lg:px-16 2xl:py-24">

                {/* Header Section — reveals badge then heading lines in sequence */}
                <motion.div
                    className="flex flex-col gap-3"
                    variants={headerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <motion.div
                        variants={revealVariants}
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#bac9cc] bg-white px-4 py-2 shadow-sm transition-transform hover:-translate-y-0.5"
                    >
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#15b6e8]" />
                        <span className="text-xs font-semibold tracking-wide text-[#3b494c]">
                            About HyperHex
                        </span>
                    </motion.div>

                    <h2 className="flex flex-col text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl 2xl:text-8xl">
                        <motion.span variants={revealVariants}>Next-Gen 3D</motion.span>
                        <motion.span variants={revealVariants} className="bg-gradient-to-b from-[#15b6e8] to-transparent bg-clip-text text-transparent">
                            Crafting Spatial Digital Experiences
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">

                    {/* Left Column: Hero Dark Card */}
                    <motion.div
                        ref={cardRef}
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        className="relative flex h-full min-h-[500px] 2xl:min-h-[640px] flex-col overflow-hidden rounded-[32px] bg-[#0d0f12] shadow-[0_20px_50px_rgba(0,0,0,0.3)] lg:col-span-7"
                    >

                        {/* Background Texture Image */}
                        <div className="absolute inset-0 pointer-events-none">
                            <Image
                                src="/logo/globe-background.avif"
                                alt="Card background lighting texture"
                                fill
                                priority
                                className="object-cover opacity-100"
                            />
                        </div>

                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#15b6e8]/15 via-transparent to-transparent pointer-events-none" />

                        {/* Card Content Stack */}
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

                        {/* Globe Wrapper - Framer Motion Scroll Triggered Offset */}
                        <motion.div
                            style={{
                                y: globeY,
                                display: 'flex',
                                placeItems: 'center',
                                placeContent: 'center',
                                overflow: 'visible',
                                background: 'rgba(0, 0, 0, 0)'
                            }}
                            className="absolute bottom-0 left-1/2 z-0 w-[135%] max-w-[950px] 2xl:max-w-[1200px] -translate-x-1/2 pointer-events-auto"
                        >
                            <div
                                className="relative w-full aspect-square max-w-[950px] 2xl:max-w-[1200px]"
                                style={{
                                    WebkitMaskImage:
                                        'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)',
                                    maskImage:
                                        'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)',
                                }}
                            >
                                <Image
                                    src="/logo/globe.webp"
                                    alt="Global dot-matrix network map"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, (max-width: 1920px) 950px, 1200px"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        contain: 'layout paint size',
                                        cursor: 'auto',
                                        userSelect: 'none'
                                    }}
                                    className="object-contain"
                                />

                                {/* Animated Hotspot Pins for Cities in Pakistan */}
                                {PAKISTAN_CITIES.map((city) => (
                                    <div
                                        key={city.name}
                                        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                                        style={{ top: city.top, left: city.left }}
                                        onMouseEnter={() => setActiveCity(city.name)}
                                        onMouseLeave={() => setActiveCity(null)}
                                    >
                                        {/* Concentric Ping Beacon */}
                                        <div className="relative flex items-center justify-center">
                                            <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-[#15b6e8] opacity-75" />
                                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#15b6e8] shadow-[0_0_8px_#15b6e8]" />
                                        </div>

                                        {/* Hover Tooltip Label */}
                                        <div
                                            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg border border-white/20 bg-[#0d0f12]/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-200 pointer-events-none ${activeCity === city.name
                                                    ? 'opacity-100 translate-y-0 scale-100'
                                                    : 'opacity-0 translate-y-1 scale-95'
                                                }`}
                                        >
                                            {city.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </motion.div>

                    {/* Right Column: Stacked Metric Cards with Skeuomorphic Shadows */}
                    <div className="flex flex-col gap-6 lg:col-span-5">

                        {/* Trust Metric Card */}
                        <motion.div
                            variants={revealVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: 0.1 }}
                            className="relative flex min-h-[240px] 2xl:min-h-[300px] flex-col justify-between overflow-hidden p-8 2xl:p-10 transition-all duration-200"
                            style={skeuomorphicCardStyle}
                        >
                            <p className="relative z-10 max-w-[85%] text-lg 2xl:text-xl font-medium leading-relaxed text-[#161d1e]">
                                Trusted by 120+ global clients — delivering photorealistic 3D visualization, interactive configurators &amp; real-time WebGL experiences.
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

                            {/* Animated Counter Watermark */}
                            <div className="pointer-events-none absolute right-4 bottom-2 select-none text-[110px] 2xl:text-[140px] font-black leading-none text-[#bac9cc]/40">
                                <Counter from={19} to={120} />+
                            </div>
                        </motion.div>

                        {/* Testimonial Card */}
                        <motion.div
                            variants={revealVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: 0.2 }}
                            className="flex min-h-[240px] 2xl:min-h-[300px] items-center gap-6 p-8 2xl:p-10 transition-all duration-200"
                            style={skeuomorphicCardStyle}
                        >
                            <div className="relative min-h-[160px] 2xl:min-h-[200px] w-1/3 shrink-0 overflow-hidden rounded-2xl shadow-md">
                                <Image
                                    src="/logo/hunain.webp"
                                    alt="Hunain Soomro - CEO of HyperHex Studio"
                                    fill
                                    sizes="200px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>

                            <div className="flex flex-col justify-center gap-3">
                                <span className="inline-block text-4xl leading-none font-serif rotate-180 text-[#bac9cc]">
                                    &ldquo;
                                </span>
                                <p className="-mt-3 text-base 2xl:text-lg font-medium leading-relaxed text-[#161d1e]">
                                    High-end 3D visualization and spatial web design bridge the gap between imagination and reality.
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#161d1e]">
                                        Hunain Soomro
                                    </span>
                                    <span className="h-3 w-px bg-[#bac9cc]" />
                                    <span className="text-xs text-[#3b494c]">
                                        Founder
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </div>
        </section>
    );
}