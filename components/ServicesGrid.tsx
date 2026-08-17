'use client';

import { motion } from 'framer-motion';
import { services } from '@/lib/services-data';
import ServiceCard from './ServiceCard';

const COLS = 3;
const ROW_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ROW_REVEAL_DURATION = 0.7;
const CARD_STAGGER = 0.18;

function groupIntoRows<T>(items: T[], cols: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += cols) {
    rows.push(items.slice(i, i + cols));
  }
  return rows;
}

const serviceRows = groupIntoRows(services, COLS);

const rowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: CARD_STAGGER,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ROW_REVEAL_DURATION, ease: ROW_REVEAL_EASE },
  },
};

export default function ServicesGrid({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
      {serviceRows.map((row, rowIndex) => (
        <motion.div
          key={`service-row-${rowIndex}`}
          className="grid grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          variants={reducedMotion ? undefined : rowVariants}
          initial={reducedMotion ? false : 'hidden'}
          whileInView={reducedMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
        >
          {row.map((service) => (
            <motion.div
              key={service.title}
              className="min-w-0"
              variants={reducedMotion ? undefined : cardVariants}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                href={service.href}
                panel={service.panel}
                icon={service.icon}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
