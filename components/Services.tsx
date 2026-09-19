import { newServicesData } from '@/lib/new-services-data';
import Services3DCarouselClient from './Services3DCarouselClient';
import ServicesHeaderAnimated from './ServicesHeaderAnimated';

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-[#f4fafd] py-6 md:py-10 overflow-hidden select-none">
      {/* SECTION HEADER - Animated entrance from upside */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 mb-3 md:mb-5 text-center">
        <ServicesHeaderAnimated />
      </div>

      {/* 3D PRESENTATION STAGE - Interactive Client Island */}
      <Services3DCarouselClient services={newServicesData} />
    </section>
  );
}