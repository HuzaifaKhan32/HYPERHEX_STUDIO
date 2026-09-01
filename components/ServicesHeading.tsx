'use client';

import React from 'react';
import StaggeredHeading from '@/components/ui/StaggeredHeading';

const BLACK = '#161d1e';
const ACCENT = '#15b6e8';

export default function ServicesHeading() {
  return (
    <div className="w-full">
      {/* Mobile — aligned scaled sizing */}
      <div className="flex flex-col items-center text-center md:hidden">
        <StaggeredHeading
          staggerDelay={0.07}
          lines={[
            {
              words: [
                { text: 'Pushing', color: BLACK, className: 'text-[clamp(26px,7vw,30px)] tracking-[0.18em]' },
                { text: 'the', color: BLACK, className: 'text-[clamp(20px,6vw,28px)] tracking-[0.08em]' },
              ],
            },
            {
              words: [
                { text: 'Boundaries', color: ACCENT, className: 'text-[clamp(36px,11vw,52px)] leading-[0.9] tracking-[-0.03em]' },
              ],
              className: 'mt-1',
            },
          ]}
        />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <StaggeredHeading
          staggerDelay={0.07}
          lines={[
            {
              words: [
                { text: 'Pushing', color: BLACK },
                { text: 'the', color: BLACK },
              ],
              className: 'text-[clamp(72px,6vw,120px)] leading-[0.95]',
            },
            {
              words: [
                { text: 'Boundaries', color: ACCENT },
              ],
              className: 'text-[clamp(72px,6vw,120px)] leading-[0.95]',
            },
          ]}
        />
      </div>
    </div>
  );
}