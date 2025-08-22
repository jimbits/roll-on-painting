import { BookQuoteDialog } from '@/components/dialogs/BookQuoteDialog';
import PhoneAction from '@/components/actions/PhoneLink';
import { MobileMenu } from '@/components/dialogs/MobileMenu';

const HomePage = () => {
  return (
    <>
      <ul className='mb-0 flex items-center justify-between px-4 pt-2.5'>
        <li>
          <PhoneAction />
        </li>
        <li>
          <p className='text-sm font-bold text-stone-500'>Roll On Quality Edmonton </p>
        </li>
        <li>
          <MobileMenu />
        </li>
      </ul>
      <header className='relative min-h-screen'>
        {/* Container with responsive padding */}
        <div className='container mx-auto px-2 py-2.5 lg:py-8'>
          {/* Single Responsive Grid Layout */}
          <div className='grid grid-cols-1 gap-2 lg:min-h-[80vh] lg:grid-cols-2 lg:items-center lg:gap-12'>
            {/* Content Column */}
            <div className='order-2 lg:order-1'>
              {/* Company Name - Mobile vs Desktop styling */}
              <p className='sm:text-5l bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))] bg-clip-text text-center text-4xl font-extrabold tracking-wide text-transparent sm:text-6xl lg:text-left lg:text-6xl'>
                Roll On Painting
              </p>

              {/* Main Headline */}
              <h1 className='mb-6 text-center leading-5 font-bold tracking-wide text-stone-800 sm:text-3xl/7 lg:px-0 lg:text-left lg:text-3xl/7 lg:font-semibold lg:text-gray-800 xl:text-4xl/8'>
                Edmontons Complete Interior &
                <span className='block'>Exterior House Painting Services</span>
              </h1>

              {/* Sub-subheading */}
              <h2 className='text-center text-base font-semibold tracking-wide text-pretty text-stone-600 sm:text-xl/6 lg:mb-4 lg:text-left lg:text-xl/5 lg:text-stone-500 xl:text-2xl'>
                Free Estimates from Licensed And Insured Home Painters{' '}
                <span className=''>Servining Edmonton a Surrounding Area.</span>
              </h2>

              {/* Buttons */}
              <div className='justiyfy-center flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center lg:flex-col lg:items-start'>
                <button className='w-3/4 rounded-lg bg-pink-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-pink-600 hover:shadow-xl'>
                  Call For Free Quote Today
                </button>
                <BookQuoteDialog className='w-3/4' />
              </div>
            </div>

            {/* Image Column - Single picture element for all screen sizes */}
            <div className='relative order-1 h-64 md:h-80 lg:order-2 lg:h-auto'>
              <picture>
                {/* Desktop image source */}
                <source
                  media='(min-width: 1024px)'
                  srcSet='https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:low,w_600/v1755015702/roll-on-painting/hero_qguyoq.png'
                />
                {/* Mobile image source */}
                <source
                  media='(max-width: 1023px)'
                  srcSet='https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_560/v1755015701/roll-on-painting/heroi-8_aavudj.jpg 560w,
                        https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_800/v1755015701/roll-on-painting/heroi-8_aavudj.jpg 800w'
                  sizes='(max-width: 768px) 100vw, (max-width: 1023px) 80vw'
                />
                {/* Fallback image */}
                <img
                  className='h-full w-full rounded-lg object-cover object-bottom shadow-lg lg:rounded-none lg:shadow-none'
                  src='https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_560/v1755015701/roll-on-painting/heroi-8_aavudj.jpg'
                  alt='house in south edmonton at dusk sun going down and the lights are on the newly painted house'
                  loading='eager'
                />
              </picture>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomePage;
