import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

import Image from 'next/image';

interface TestPageProps {
  children?: ReactNode;
  className?: string;
}

/* 
 <ul className="md:grid md:grid-cols-2 md:gap-4">
        {serviceData.map(service => (
          <li key={service.uid}>
            <PaintingServiceCard service={service} className="mx-auto mb-4 max-w-md" />
          </li>
        ))}
      </ul>
*/

function TestPage({ className }: TestPageProps) {
  return (
    <section className={cn('mx-auto max-w-7xl p-4', className)}>
      <header className="mb-8 lg:mb-12">
        <h2 className="text-3xl font-extrabold text-pretty text-zinc-800 lg:mb-2 lg:text-center lg:text-6xl">
          Interior Home Painting Services
        </h2>
        <p className="mx-auto text-base/snug font-medium text-gray-600 lg:w-[70%] lg:text-center lg:text-2xl lg:text-pretty">
          Roll On Painting interior home painting services delivering flawless walls, ceilings, and
          finishes. Using quality materials to and lasting results.
        </p>
      </header>

      <section className="mx-auto max-w-xl space-y-8 lg:grid lg:max-w-full lg:grid-cols-2 lg:grid-rows-[repeat(2,250px)] lg:gap-x-12">
        <header className="lg:col-start-2 lg:col-end-3">
          <h2 className="text-xl font-bold lg:text-3xl">Core Interior Services</h2>
          <p className="text-base/snug text-gray-700 lg:text-lg/relaxed">
            With all of our core services we like to start by cleaning and preping the wall surface.
            Often this includes filling holes and sanding and smothing out surfaces for a perfect
            finish. Next we apply primer coat and depending on the surface and we paint two
            finishing coats. After the second coat we do our final inspection and clean up the work
            area before we do our final walk through with the customer.
          </p>
        </header>

        <Image
          src="/services/pouring-paint.jpg"
          alt="painter pouring paint into a tray ready to add second coat"
          width={560}
          height={412}
          className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3"
        />

        <div className="flex h-fit justify-center gap-12 bg-gray-100 p-8 font-semibold tracking-tight text-stone-600 lg:col-start-2 lg:col-end-3 lg:mt-8">
          <ul>
            <li>Interior Wall Painting</li>
            <li>Ceilings</li>
            <li>Trim Baseboard & Casing</li>
          </ul>
          <ul>
            <li>Windows & Doors</li>
            <li>Built in Cabinets</li>
            <li>Kitchen & Bathrooms</li>
          </ul>
        </div>
      </section>
    </section>
  );
}

export default TestPage;
