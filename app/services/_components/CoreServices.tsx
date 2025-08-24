import { cn } from '@/lib/utils';

import InteriorIcon from '@/icons/interior-wall.svg';

interface CoreServicesProps {
  className?: string;
}

function CoreServices({ className }: CoreServicesProps) {
  return (
    <section
      className={cn(
        'r flex h-full w-full flex-col rounded bg-gray-50 px-3 py-6 shadow-md hover:bg-blue-50',
        className
      )}
    >
      <header className="mb-4">
        <h2 className="text-center text-3xl font-extrabold">Core Interior Painting Services</h2>
        <p className="text-base leading-snug text-gray-700">
          Expert interior painting services for Edmonton homeowners. Professional application of
          premium finishes ensures beautiful, durable results for your residential painting
          projects.
        </p>
      </header>
      <InteriorIcon className="h-12 w-12" />

      <div className="w-48">
        <div>
          <h3>Inerior Wall Painting</h3>
          <p>
            Professional application of standard flat, eggshell, satin, or semi-gloss finishes for a
            flawless, long-lasting result in every room.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CoreServices;
