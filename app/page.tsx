import dynamic from 'next/dynamic';
import NavbarServer from '@/components/NavbarServer';
import HeroSection from '@/components/HeroSection';
import ClientMarquee from '@/components/ClientMarquee';
import FooterServer from '@/components/FooterServer';
import ScrollProgress from '@/components/ScrollProgress';

// Lazy-load below-the-fold sections to reduce initial bundle and blocking time
const AboutUsServer = dynamic(() => import('@/components/AboutUsServer'), {
  loading: () => (
    <div className="w-full py-24 bg-background flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

const CaseStudiesSection = dynamic(() => import('@/components/CaseStudiesSection'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

const Services = dynamic(() => import('@/components/Services'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

const LatestWorkGallery = dynamic(() => import('@/components/LatestWorkGallery'), {
  loading: () => (
    <div className="w-full py-24 bg-surface flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});

const TestimonialsServer = dynamic(() => import('@/components/TestimonialsServer'), {
  loading: () => (
    <div className="w-full py-24 bg-background flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  ),
});


const ContactForm = dynamic(() => import('@/components/ContactForm'), {
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

