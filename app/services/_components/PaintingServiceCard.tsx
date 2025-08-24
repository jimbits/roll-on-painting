import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { type ServiceData } from './../_data/serviceData';
import Image from 'next/image';

interface PaintingServiceCardProps {
  children?: ReactNode;
  className?: string;
  service: ServiceData;
}

function PaintingServiceCard({ className, service }: PaintingServiceCardProps) {
  return (
    <section
      className={cn(
        'r flex h-full w-full flex-col rounded bg-gray-50 px-3 py-6 shadow-md hover:bg-blue-50',
        className
      )}
    >
      <Image
        src={`/services/${service.image.url}`}
        alt="some alt text"
        width={service.image.width}
        height={service.image.height}
        className="h-72"
      />

      <div className="mt-4">
        <h3 className="text-xl font-bold">{service.type}</h3>

        <p className="text-sm/snug text-gray-600">{service.shortDescription}</p>
      </div>
    </section>
  );
}

export default PaintingServiceCard;
