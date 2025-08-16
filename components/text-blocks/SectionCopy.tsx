import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionCopyProps {
  children?: ReactNode;
  className?: string;
}

function SectionCopy({ className }: SectionCopyProps) {
  return (
    <div className={cn('lg:pr-8', className)}>
      <h2 className='text-pretty text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
        Our mission
      </h2>
      <p className='mt-6 text-base text-gray-600 dark:text-gray-400'>
        Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
        semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
        viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat.
        Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.
      </p>
      <p className='mt-8 text-base/7 text-gray-600 dark:text-gray-400'>
        Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit
        molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius
        vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem
        vel integer orci.
      </p>
    </div>
  );
}

export default SectionCopy;
