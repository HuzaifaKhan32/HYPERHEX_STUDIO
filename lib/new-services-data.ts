import { SERVICES, Service } from './content-data';

export interface ServiceCardData {
  id: string;
  counter: string;
  title: string;
  description: string;
  imageSrc: string;
}

export const newServicesData: ServiceCardData[] = SERVICES.map((service, index) => {
  const currentNum = String(index + 1).padStart(2, '0');
  const totalNum = String(SERVICES.length).padStart(2, '0');
  return {
    id: service.id,
    counter: `${currentNum} / ${totalNum}`,
    title: service.title,
    description: service.description,
    imageSrc: service.imageSrc,
  };
});

