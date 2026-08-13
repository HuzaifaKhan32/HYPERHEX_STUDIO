import ServiceCard from './ServiceCard';
import ServicesHeading from './ServicesHeading';

const iconClass = 'h-7 w-7';

const services = [
  {
    title: '3D Motion Design',
    description:
      'High-end procedural animations and physics-based simulations for hyper-realistic visual storytelling.',
    panel: 'cyan' as const,
    href: '#contact',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 12c2-6 6-6 8 0s6 6 8 0M4 12c2 6 6 6 8 0s6-6 8 0"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: 'Visual Identity',
    description:
      'Technical branding systems designed to architect the aesthetic foundation of next-generation digital products.',
    panel: 'ink' as const,
    href: '#contact',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    title: 'Creative Direction',
    description:
      'Strategic oversight, conceptual mapping, and narrative-driven visual storytelling across diverse media environments.',
    panel: 'cyan' as const,
    href: '#contact',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Experience Design',
    description:
      'Immersive spatial interfaces, interactive web environments, and avant-garde UI/UX paradigms.',
    panel: 'ink' as const,
    href: '#contact',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M12 12V3M12 12l7.5-4.5M12 12 4.5 7.5" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    title: 'CGI Production',
    description:
      'Photorealistic product renders, cinematic environment building, and studio-grade lighting simulations.',
    panel: 'cyan' as const,
    href: '#contact',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.75" />
        <path d="M8 7 9.5 4h5L16 7" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Research & Dev',
    description:
      'Exploring the bleeding edge intersection of generative code, AI integration, and new visual technologies.',
    panel: 'ink' as const,
    href: '#contact',
    icon: (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 3h6M10 3v5.5L6 16v3h12v-3l-4-7.5V3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 16h8" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-white py-24 md:py-32 px-5 lg:px-16"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-6">
          <p className="flex items-center gap-3 font-[family-name:var(--font-dm-sans)] text-xs font-bold tracking-[0.2em] text-mist uppercase">
            <span aria-hidden="true">//</span> Our Service
          </p>
          <ServicesHeading />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              href={service.href}
              panel={service.panel}
              delay={index * 0.15}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
