'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef } from 'react';

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  subtitleColor: string;
  buttonBg: string;
  buttonText: string;
  imagePath: string;
  imageAlt: string;
  href: string;
}

const services: ServiceCard[] = [
  {
    id: 'configurator',
    title: '3D Product',
    subtitle: 'Configurator',
    bgColor: 'bg-gradient-to-br from-[#ff6b6b] via-[#ff8e53] to-[#ffd93d]',
    textColor: 'text-white',
    subtitleColor: 'text-white/90',
    buttonBg: 'bg-white/20',
    buttonText: 'text-white',
    imagePath: '/services/speaker.png',
    imageAlt: '3D Product Configurator',
    href: '#configurator',
  },
  {
    id: 'product-viz',
    title: '3D Product',
    subtitle: 'Visualization',
    bgColor: 'bg-white',
    textColor: 'text-[#1a1a1a]',
    subtitleColor: 'text-[#6b7280]',
    buttonBg: 'bg-black/10',
    buttonText: 'text-black',
    imagePath: '/services/Kamera.png',
    imageAlt: '3D Product Visualization',
    href: '#product-viz',
  },
  {
    id: 'architecture',
    title: 'Architecture',
    subtitle: 'Visualization',
    bgColor: 'bg-[#1a1a1a]',
    textColor: 'text-white',
    subtitleColor: 'text-white/70',
    buttonBg: 'bg-white/20',
    buttonText: 'text-white',
    imagePath: '/services/architecture.png',
    imageAlt: 'Architecture Visualization',
    href: '#architecture',
  },
  {
    id: 'web-dev',
    title: 'Web',
    subtitle: 'Development',
    bgColor: 'bg-white',
    textColor: 'text-[#1a1a1a]',
    subtitleColor: 'text-[#6b7280]',
    buttonBg: 'bg-black/10',
    buttonText: 'text-black',
    imagePath: '/services/laptop.png',
    imageAlt: 'Web Development',
    href: '#web-dev',
  },
  {
    id: 'drone',
    title: 'Drone',
    subtitle: 'Animation',
    bgColor: 'bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]',
    textColor: 'text-white',
    subtitleColor: 'text-white/90',
    buttonBg: 'bg-white/20',
    buttonText: 'text-white',
    imagePath: '/services/drone.png',
    imageAlt: 'Drone Animation',
    href: '#drone',
  },
  {
    id: 'animation',
    title: '3D',
    subtitle: 'Animation',
    bgColor: 'bg-white',
    textColor: 'text-[#1a1a1a]',
    subtitleColor: 'text-[#6b7280]',
    buttonBg: 'bg-black/10',
    buttonText: 'text-black',
    imagePath: '/services/Kamera.png',
    imageAlt: '3D Animation',
    href: '#animation',
  },
  {
    id: 'interactive',
    title: 'Interactive',
    subtitle: 'Real-Time',
    bgColor: 'bg-[#1a1a1a]',
    textColor: 'text-white',
    subtitleColor: 'text-white/70',
    buttonBg: 'bg-white/20',
    buttonText: 'text-white',
    imagePath: '/services/real-time-interactive.png',
    imageAlt: 'Interactive Real-Time',
    href: '#interactive',
  },
  {
    id: 'vr',
    title: 'VR',
    subtitle: 'Development',
    bgColor: 'bg-gradient-to-br from-[#11998e] via-[#38ef7d] to-[#a8ff78]',
    textColor: 'text-white',
    subtitleColor: 'text-white/90',
    buttonBg: 'bg-white/20',
    buttonText: 'text-white',
    imagePath: '/services/VR.png',
    imageAlt: 'VR Development',
    href: '#vr',
  },
  {
    id: 'ai-content',
    title: 'AI Content',
    subtitle: 'Creation',
    bgColor: 'bg-gradient-to-br from-[#f093fb] via-[#f5576c] to-[#fda085]',
    textColor: 'text-white',
    subtitleColor: 'text-white/90',
    buttonBg: 'bg-white/20',
    buttonText: 'text-white',
    imagePath: '/services/laptop.png',
    imageAlt: 'AI Content Creation',
    href: '#ai-content',
  },
];

export default function ServicesShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleMouseMove = (e: React.MouseEvent, id: string) => {
    const card = cardRefs.current[id];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const rotateX = (y / centerY) * 8;
    const rotateY = (x / centerX) * -8;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHoveredId(null);
  };

  return (
    <section
      id="services-showcase"
      className="relative w-full bg-[#f5f5f5] py-16 md:py-24 lg:py-32 px-5 lg:px-16 2xl:px-24"
      style={{ perspective: '1200px' }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
              Our Services
            </span>
          </div>

          <h2
            className="flex flex-col items-center text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]"
            style={{ fontFamily: 'var(--font-zalando-expanded)' }}
          >
            <span className="text-[#1a1a1a] uppercase">What We</span>
            <span className="uppercase bg-gradient-to-r from-accent via-[#667eea] to-[#ff6b6b] bg-clip-text text-transparent">
              Create For You
            </span>
          </h2>
        </motion.div>

        {/* Services Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {services.map((service, index) => (
            <motion.a
              key={service.id}
              ref={(el) => {
                if (el) cardRefs.current[service.id] = el;
              }}
              href={service.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseMove={(e) => handleMouseMove(e, service.id)}
              onMouseLeave={handleMouseLeave}
              className={`
                group relative overflow-hidden rounded-[2rem] ${service.bgColor}
                transition-all duration-500 ease-out
                min-h-[320px] md:min-h-[360px] lg:min-h-[400px]
                cursor-pointer
              `}
              style={{
                transformStyle: 'preserve-3d',
                transform:
                  hoveredId === service.id
                    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(30px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
                boxShadow:
                  hoveredId === service.id
                    ? '0 35px 80px rgba(0,0,0,0.25), 0 0 50px rgba(21,182,232,0.15)'
                    : '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              {/* Content Container - Top Left */}
              <div className="relative z-20 flex flex-col justify-between h-full p-7 md:p-8 lg:p-9">
                <div className="flex-shrink-0">
                  <motion.h3
                    className={`${service.textColor} text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight`}
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p
                    className={`${service.subtitleColor} text-lg md:text-xl lg:text-2xl font-normal mt-1`}
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {service.subtitle}
                  </motion.p>
                </div>

                {/* Learn More Button - positioned at bottom */}
                <motion.div
                  className="flex items-center gap-2 mt-auto pt-6"
                  animate={hoveredId === service.id ? { x: 4 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}
                >
                  <motion.div
                    className={`w-8 h-8 rounded-full ${service.buttonBg} backdrop-blur-sm flex items-center justify-center`}
                    animate={hoveredId === service.id ? { rotate: 45, scale: 1.15 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className={`w-3.5 h-3.5 ${service.buttonText}`} />
                  </motion.div>
                  <span className={`${service.textColor} text-xs font-bold uppercase tracking-[0.15em]`}>
                    Learn More
                  </span>
                </motion.div>
              </div>

              {/* Image - Bottom Right Corner */}
              <motion.div
                className="absolute bottom-0 right-0 w-[55%] h-[55%] pointer-events-none overflow-hidden"
                animate={
                  hoveredId === service.id
                    ? { scale: 1.25, y: -20 }
                    : { scale: 1, y: 0 }
                }
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  transformStyle: 'preserve-3d',
                  transform:
                    hoveredId === service.id
                      ? `scale(1.25) translateY(-20px) translateZ(50px)`
                      : `scale(1) translateY(0px) translateZ(0px)`,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={service.imagePath}
                    alt={service.imageAlt}
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 30vw"
                    className="object-contain object-bottom object-right"
                    style={{
                      filter:
                        hoveredId === service.id
                          ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.35))'
                          : 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))',
                      opacity: 1,
                    }}
                  />
                </div>
              </motion.div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-[2rem]"
                animate={hoveredId === service.id ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background:
                    'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.25) 0%, transparent 65%)',
                }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
