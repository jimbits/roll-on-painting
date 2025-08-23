import { cn } from '@/lib/utils';

interface ReviewSummary {
  average: number;
  totalReviews: number;
  ratings: Record<1 | 2 | 3 | 4 | 5, number>;
}

const reviewSummaryData = {
  average: 4.2,
  totalReviews: 1624,
  ratings: {
    5: 1025,
    4: 162,
    3: 97,
    2: 199,
    1: 147,
  },
};

//w-[calc(97/1624*100%)]

const width = (rating: keyof ReviewSummary['ratings']): string => {
  let width = (reviewSummaryData.ratings[rating] / reviewSummaryData.totalReviews) * 100;
  width = 337 - width;
  return width + '%';
};

function ReviewSummary() {
  console.log((reviewSummaryData.ratings[5] / reviewSummaryData.totalReviews) * 100 * 336);
  return (
    <div className='max-w-480px] mx-auto px-8'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Customer Reviews</h2>

      <div className='mt-3 flex items-center'>
        <div>
          <div className='flex items-center'>
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              data-slot='icon'
              aria-hidden='true'
              className='size-5 shrink-0 text-yellow-400'
            >
              <path
                d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                clipRule='evenodd'
                fillRule='evenodd'
              ></path>
            </svg>
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              data-slot='icon'
              aria-hidden='true'
              className='size-5 shrink-0 text-yellow-400'
            >
              <path
                d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                clipRule='evenodd'
                fillRule='evenodd'
              ></path>
            </svg>
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              data-slot='icon'
              aria-hidden='true'
              className='size-5 shrink-0 text-yellow-400'
            >
              <path
                d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                clipRule='evenodd'
                fillRule='evenodd'
              ></path>
            </svg>
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              data-slot='icon'
              aria-hidden='true'
              className='size-5 shrink-0 text-yellow-400'
            >
              <path
                d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                clipRule='evenodd'
                fillRule='evenodd'
              ></path>
            </svg>
            <svg
              viewBox='0 0 20 20'
              fill='currentColor'
              data-slot='icon'
              aria-hidden='true'
              className='size-5 shrink-0 text-gray-300'
            >
              <path
                d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                clipRule='evenodd'
                fillRule='evenodd'
              ></path>
            </svg>
          </div>
          <p className='sr-only'>4 out of 5 stars</p>
        </div>
        <p className='ml-2 text-sm text-gray-900'>Based on 1624 reviews</p>
      </div>

      <div className='mt-6'>
        <h3 className='sr-only'>Review data</h3>

        <dl className='space-y-3'>
          <div className='flex items-center text-sm'>
            <dt className='flex flex-1 items-center'>
              <p className='w-3 font-medium text-gray-900'>
                5<span className='sr-only'> star reviews</span>
              </p>
              <div aria-hidden='true' className='ml-1 flex flex-1 items-center'>
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  data-slot='icon'
                  aria-hidden='true'
                  className='size-5 shrink-0 text-yellow-400'
                >
                  <path
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                    clipRule='evenodd'
                    fillRule='evenodd'
                  ></path>
                </svg>

                <div className='relative ml-3 flex-1'>
                  <div className='h-3 rounded-full border border-gray-200 bg-gray-100'></div>
                  <div
                    className={cn(
                      'absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400',
                      `w-[calc(1067/1624*100%)]`
                    )}
                  ></div>
                </div>
              </div>
            </dt>
            <dd className='ml-3 w-10 text-right text-sm text-gray-900 tabular-nums'>63%</dd>
          </div>
          <div className='flex items-center text-sm'>
            <dt className='flex flex-1 items-center'>
              <p className='w-3 font-medium text-gray-900'>
                4<span className='sr-only'> star reviews</span>
              </p>
              <div aria-hidden='true' className='ml-1 flex flex-1 items-center'>
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  data-slot='icon'
                  aria-hidden='true'
                  className='size-5 shrink-0 text-yellow-400'
                >
                  <path
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                    clipRule='evenodd'
                    fillRule='evenodd'
                  ></path>
                </svg>

                <div className='relative ml-3 flex-1'>
                  <div className='h-3 rounded-full border border-gray-200 bg-gray-100'></div>
                  <div className='absolute inset-y-0 w-[calc(162/1624*100%)] rounded-full border border-yellow-400 bg-yellow-400'></div>
                </div>
              </div>
            </dt>
            <dd className='ml-3 w-10 text-right text-sm text-gray-900 tabular-nums'>10%</dd>
          </div>
          <div className='flex items-center text-sm'>
            <dt className='flex flex-1 items-center'>
              <p className='w-3 font-medium text-gray-900'>
                3<span className='sr-only'> star reviews</span>
              </p>
              <div aria-hidden='true' className='ml-1 flex flex-1 items-center'>
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  data-slot='icon'
                  aria-hidden='true'
                  className='size-5 shrink-0 text-yellow-400'
                >
                  <path
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                    clipRule='evenodd'
                    fillRule='evenodd'
                  ></path>
                </svg>

                <div className='relative ml-3 flex-1'>
                  <div className='h-3 rounded-full border border-gray-200 bg-gray-100'></div>
                  <div className='absolute inset-y-0 w-[calc(97/1624*100%)] rounded-full border border-yellow-400 bg-yellow-400'></div>
                </div>
              </div>
            </dt>
            <dd className='ml-3 w-10 text-right text-sm text-gray-900 tabular-nums'>6%</dd>
          </div>
          <div className='flex items-center text-sm'>
            <dt className='flex flex-1 items-center'>
              <p className='w-3 font-medium text-gray-900'>
                2<span className='sr-only'> star reviews</span>
              </p>
              <div aria-hidden='true' className='ml-1 flex flex-1 items-center'>
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  data-slot='icon'
                  aria-hidden='true'
                  className='size-5 shrink-0 text-yellow-400'
                >
                  <path
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                    clipRule='evenodd'
                    fillRule='evenodd'
                  ></path>
                </svg>

                <div className='relative ml-3 flex-1'>
                  <div className='h-3 rounded-full border border-gray-200 bg-gray-100'></div>
                  <div className='absolute inset-y-0 w-[calc(199/1624*100%)] rounded-full border border-yellow-400 bg-yellow-400'></div>
                </div>
              </div>
            </dt>
            <dd className='ml-3 w-10 text-right text-sm text-gray-900 tabular-nums'>12%</dd>
          </div>
          <div className='flex items-center text-sm'>
            <dt className='flex flex-1 items-center'>
              <p className='w-3 font-medium text-gray-900'>
                1<span className='sr-only'> star reviews</span>
              </p>
              <div aria-hidden='true' className='ml-1 flex flex-1 items-center'>
                <svg
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  data-slot='icon'
                  aria-hidden='true'
                  className='size-5 shrink-0 text-yellow-400'
                >
                  <path
                    d='M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z'
                    clipRule='evenodd'
                    fillRule='evenodd'
                  ></path>
                </svg>

                <div className='relative ml-3 flex-1'>
                  <div className='h-3 rounded-full border border-gray-200 bg-gray-100'></div>
                  <div className='absolute inset-y-0 w-[calc(147/1624*100%)] rounded-full border border-yellow-400 bg-yellow-400'></div>
                </div>
              </div>
            </dt>
            <dd className='ml-3 w-10 text-right text-sm text-gray-900 tabular-nums'>9%</dd>
          </div>
        </dl>
      </div>

      <div className='mt-10'>
        <h3 className='text-lg font-medium text-gray-900'>Share your thoughts</h3>
        <p className='mt-1 text-sm text-gray-600'>
          If you’ve used this product, share your thoughts with other customers
        </p>

        <a
          href='#'
          className='mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full'
        >
          Write a review
        </a>
      </div>
    </div>
  );
}

export default ReviewSummary;
