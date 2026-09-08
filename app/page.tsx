import dynamic from 'next/dynamic';
import NavbarServer from '@/components/NavbarServer';
import HeroSection from '@/components/HeroSection';
import ClientMarquee from '@/components/ClientMarquee';
import Services from '@/components/Services';
import LatestWorkGallery from '@/components/LatestWorkGallery';
import ContactForm from '@/components/ContactForm';
import FooterServer from '@/components/FooterServer';
import ScrollProgress from '@/components/ScrollProgress';
import AboutUsServer from '@/components/AboutUsServer';
import TestimonialsServer from '@/components/TestimonialsServer';

// Lazy-load CaseStudiesSection to reduce initial bundle size and avoid blocking critical path
const CaseStudiesSection = dynamic(() => import('@/components/CaseStudiesSection'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <NavbarServer />
      <main className="w-full pt-0 md:pt-28">
        <HeroSection />
        <ClientMarquee />
        <AboutUsServer />
        <CaseStudiesSection />
        <Services />
        <LatestWorkGallery />
        <TestimonialsServer />
        <ContactForm />
      </main>
      <FooterServer />
    </div>
  );
}

