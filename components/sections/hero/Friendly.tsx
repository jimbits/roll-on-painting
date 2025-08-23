import { cn } from '@/lib/utils';

interface CallToActionsProps {
  className?: string;
}

function CallToActions({ className }: CallToActionsProps) {
  return (
    <div className={cn('', className)}>
      <h2 className='mb-4 text-2xl font-bold tracking-tighter text-stone-600'>
        Complete House Painting Services Throughout Edmonton
      </h2>
      <h3 className='class=" dark:text-gray-400" mb-2 text-pretty font-medium text-gray-500 sm:text-xl/8'>
        Free Estimates from Licensed & Insured Home Painters
      </h3>
      <div className='flex justify-center gap-3'>
        <button
          type='button'
          className='flex-1/2 bg-linear-to-tr rounded-sm from-rose-600 via-rose-500 to-rose-600 py-2.5 text-center text-base font-medium tracking-tight text-white'
        >
          Call For Free Quote Today
        </button>

        <button
          type='button'
          className='flex-1/2 bg-linear-to-bl rounded-sm from-blue-500 from-15% via-blue-600 via-35% to-indigo-600 to-85% py-2.5 text-center text-base font-medium tracking-tight text-white'
        >
          Book Your Quote Online
        </button>
      </div>
    </div>
  );
}

export default CallToActions;
