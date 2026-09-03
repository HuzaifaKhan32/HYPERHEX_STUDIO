import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientMarquee from '@/components/ClientMarquee';
import Services from '@/components/Services';
import LatestWorkGallery from '@/components/LatestWorkGallery';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import AboutUs from '@/components/AboutUs';
import TestimonialsSection from '@/components/TestimonialsSection';

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
      <Navbar />
      <main className="w-full pt-24 md:pt-28">
        <Hero />
        <ClientMarquee />
        <AboutUs />
        <CaseStudiesSection />
        <Services />
        <LatestWorkGallery />
        <TestimonialsSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

