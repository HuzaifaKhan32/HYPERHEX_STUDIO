import Services3DCarouselClient from './Services3DCarouselClient';
import { newServicesData } from '@/lib/new-services-data';

export default function Services3DCarousel() {
  return <Services3DCarouselClient services={newServicesData} />;
}
