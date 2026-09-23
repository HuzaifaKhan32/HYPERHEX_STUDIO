'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const links = [
  { label: 'Terms of Use', href: '/terms-of-use' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

export default function FooterTermsLinks() {
  return (
    <div className="flex gap-8 text-sm font-medium">
      {links.map((item) => (
        <motion.div key={item.label} whileHover={{ y: -2 }}>
          <Link
            href={item.href}
            className="text-sm font-medium text-zinc-400 hover:text-[#15b6e8] transition-colors"
          >
            {item.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
