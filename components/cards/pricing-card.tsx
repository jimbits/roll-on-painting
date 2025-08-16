export default function PricingCard() {
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden p-8'>
      {/* Pricing Card */}
      <div className='relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl'>
        {/* Standard Badge */}
        <div className='mb-6 inline-block rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 font-medium text-white'>
          Standard
        </div>

        {/* Price */}
        <div className='mb-6'>
          <span className='text-5xl font-bold text-gray-900'>$9.99</span>
          <span className='ml-2 text-gray-500'>/ Per Month</span>
        </div>

        {/* Description */}
        <p className='mb-8 leading-relaxed text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur elit.
        </p>

        {/* Feature List */}
        <ul className='mb-8 space-y-4'>
          <li className='flex items-start'>
            <svg className='mr-3 mt-0.5 h-5 w-5 flex-shrink-0' viewBox='0 0 20 20'>
              <circle cx='10' cy='10' r='10' fill='#06B6D4' />
              <path
                d='M8 10.5l1.5 1.5L14 7.5'
                stroke='white'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-sm text-gray-700'>Lorem ipsum dolor sit amet</span>
          </li>
          <li className='flex items-start'>
            <svg className='mr-3 mt-0.5 h-5 w-5 flex-shrink-0' viewBox='0 0 20 20'>
              <circle cx='10' cy='10' r='10' fill='#06B6D4' />
              <path
                d='M8 10.5l1.5 1.5L14 7.5'
                stroke='white'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-sm text-gray-700'>Lorem ipsum dolor sit amet</span>
          </li>
          <li className='flex items-start'>
            <svg className='mr-3 mt-0.5 h-5 w-5 flex-shrink-0' viewBox='0 0 20 20'>
              <circle cx='10' cy='10' r='10' fill='#06B6D4' />
              <path
                d='M8 10.5l1.5 1.5L14 7.5'
                stroke='white'
                strokeWidth='2'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-sm text-gray-700'>Lorem ipsum dolor sit amet</span>
          </li>
          <li className='flex items-start'>
            <svg className='mr-3 mt-0.5 h-5 w-5 flex-shrink-0' viewBox='0 0 20 20'>
              <circle cx='10' cy='10' r='10' fill='#6B7280' />
              <path
                d='M7 7l6 6M13 7l-6 6'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-sm text-gray-700'>Lorem ipsum dolor sit amet</span>
          </li>
        </ul>

        {/* Buy Now Button */}
        <button className='w-full rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-purple-800'>
          BUY NOW
        </button>
      </div>
    </div>
  );
}
