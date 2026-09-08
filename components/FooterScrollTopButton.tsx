'use client';

// Client wrapper for scroll-to-top button
import Button3D from './Button3D';

export default function FooterScrollTopButton() {
  return (
    <Button3D
      arrowDirection="up"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Back to Top
    </Button3D>
  );
}
