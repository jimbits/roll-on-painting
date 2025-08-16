import { cn } from '@/lib/utils';

interface CallToActionsProps {
  className?: string;
}

function CallToActions({ className }: CallToActionsProps) {
  return (
    <div className={cn('', className)}>
      <h2 className=' text-2xl     tracking-tighter      text-stone-600 font-bold  mb-4   '>
        Complete House Painting Services Throughout Edmonton
      </h2>
      <h3 className=' class=" mb-2    font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400"'>
        Free Estimates from Licensed & Insured Home Painters
      </h3>
      <div className='flex justify-center gap-3'>
        <button
          type='button'
          className='flex-1/2 text-base text-white font-medium tracking-tight text-center bg-linear-to-tr from-rose-600 via-rose-500 to-rose-600  rounded-sm  py-2.5 '
        >
          Call For Free Quote Today
        </button>

        <button
          type='button'
          className=' flex-1/2 text-base  text-white font-medium tracking-tight text-center bg-linear-to-bl from-blue-500 from-15% via-blue-600 via-35% to-indigo-600  to-85% rounded-sm  py-2.5  '
        >
          Book Your Quote Online
        </button>
      </div>
    </div>
  );
}

export default CallToActions;
