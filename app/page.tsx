import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientMarquee from '@/components/ClientMarquee';
import Services from '@/components/Services';
import LatestWorkVariant from '@/components/LatestWorkVariant';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import FeaturedCaseStudies from '@/components/FeaturedCaseStudies';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="w-full pt-24 md:pt-28">
        <Hero />
        <ClientMarquee />
        <Services />
        <LatestWorkVariant />
        <FeaturedCaseStudies />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

