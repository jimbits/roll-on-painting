import { cn } from '@/lib/utils';

interface CallToActionProps {
  // Add your props here
  icon: string;
  className: string;
}

export function CallToAction({ className }: CallToActionProps) {
  return (
    <div className={cn('min-h-screen  ', className)}>
      <div className='p-8'>
        <div className='space-y-4'>
          <div className='flex flex-col justify-center items-center w-fit '>
            {/* <CalculatorIcon className='w-8 h-8 stroke-1 stroke-white' /> */}
            <p className='text-white text-lg font-semibold text-center '>
              Get A Quick Estimate
              <span className='text-sm block font-normal   '>Try our painting estimator.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
