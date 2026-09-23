'use client';

// Desktop navigation links with active state pill animation
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type NavLink = {
  id: string;
  label: string;
  href: string;
};

export default function NavbarDesktopLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-2 2xl:gap-3 max-w-full rounded-[100px] p-1 2xl:p-1.5 backdrop-blur-2xl md:flex" style={{ backgroundColor: 'rgba(0,0,0,0.04)', boxShadow: '0px 5px 6px 0px rgba(0,0,0,0.1),0px 24px 20px 0px rgba(0,0,0,0.12),0px 3px 0px 0px #F5F5F5' }}>
      {links.map((link) => {
        const isAnchor = link.href.includes('#');
        const isActive = !isAnchor && (
          link.href === '/'
            ? pathname === '/'
            : pathname === link.href || pathname.startsWith(link.href + '/')
        );

        return (
          <Link
            key={link.id}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex items-center gap-2 rounded-full px-4 py-2 2xl:px-6 2xl:py-3 font-[family-name:var(--font-dm-sans)] transition-colors duration-200 ${
              isActive ? 'text-[var(--color-paper)]' : 'text-[#4a4a4a] hover:text-black'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 rounded-full border-t border-b-2 border-t-white/10 border-b-[#3e3e3e] bg-gradient-to-b from-[#0a0a0a] to-[#616161] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),_0_1px_0_rgba(255,255,255,0.1)]"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2 2xl:gap-3 py-1 2xl:py-1.5 text-xs 2xl:text-sm font-bold tracking-tight uppercase whitespace-nowrap">
              {isActive && <span className="h-2 w-2 2xl:h-2.5 2xl:w-2.5 rounded-full bg-[var(--color-accent)]" />}
              {link.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
