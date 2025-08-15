export default function PricingCard() {
  return (
    <div className='min-h-screen relative overflow-hidden  flex items-center justify-center p-8'>
      {/* Pricing Card */}
      <div className='relative bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full'>
        {/* Standard Badge */}
        <div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg inline-block mb-6 font-medium'>
          Standard
        </div>

        {/* Price */}
        <div className='mb-6'>
          <span className='text-5xl font-bold text-gray-900'>$9.99</span>
          <span className='text-gray-500 ml-2'>/ Per Month</span>
        </div>

        {/* Description */}
        <p className='text-gray-600 mb-8 leading-relaxed'>
          Lorem ipsum dolor sit amet, consectetur elit.
        </p>

        {/* Feature List */}
        <ul className='space-y-4 mb-8'>
          <li className='flex items-start'>
            <svg className='w-5 h-5 mr-3 mt-0.5 flex-shrink-0' viewBox='0 0 20 20'>
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
            <span className='text-gray-700 text-sm'>Lorem ipsum dolor sit amet</span>
          </li>
          <li className='flex items-start'>
            <svg className='w-5 h-5 mr-3 mt-0.5 flex-shrink-0' viewBox='0 0 20 20'>
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
            <span className='text-gray-700 text-sm'>Lorem ipsum dolor sit amet</span>
          </li>
          <li className='flex items-start'>
            <svg className='w-5 h-5 mr-3 mt-0.5 flex-shrink-0' viewBox='0 0 20 20'>
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
            <span className='text-gray-700 text-sm'>Lorem ipsum dolor sit amet</span>
          </li>
          <li className='flex items-start'>
            <svg className='w-5 h-5 mr-3 mt-0.5 flex-shrink-0' viewBox='0 0 20 20'>
              <circle cx='10' cy='10' r='10' fill='#6B7280' />
              <path
                d='M7 7l6 6M13 7l-6 6'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span className='text-gray-700 text-sm'>Lorem ipsum dolor sit amet</span>
          </li>
        </ul>

        {/* Buy Now Button */}
        <button className='w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg'>
          BUY NOW
        </button>
      </div>
    </div>
  );
}
