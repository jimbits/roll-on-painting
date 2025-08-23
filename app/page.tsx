import { BookQuoteDialog } from '@/components/dialogs/BookQuoteDialog';
import PhoneAction from '@/components/actions/PhoneLink';
import { MobileMenu } from '@/components/dialogs/MobileMenu';
import ReviewSection from '@/components/landing/reviews/ReviewSection';
const HomePage = () => {
  return (
    <>
      <ul className="mb-0 flex items-center justify-between px-4 pt-2.5">
        <li>
          <PhoneAction />
        </li>
        <li>
          <p className="text-sm font-bold text-stone-500">Roll On Quality Edmonton </p>
        </li>
        <li>
          <MobileMenu />
        </li>
      </ul>
      <header className="relative">
        {/* Container with responsive padding */}
        <div className="mx-auto px-2 py-2.5 lg:py-8 2xl:px-10">
          {/* Single Responsive Grid Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Content Column */}
            <div className="order-2 lg:order-1">
              {/* Company Name - Mobile vs Desktop styling */}
              <p className="xl:tracking-tigher bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))] bg-clip-text text-center text-5xl leading-12 font-extrabold tracking-wide text-transparent sm:text-5xl md:text-6xl/18 lg:text-left lg:text-6xl/18 xl:text-7xl/28 2xl:text-8xl/28">
                Roll On Painting
              </p>

              {/* Main Headline */}
              <h1 className="mb-6 text-center leading-5 font-bold tracking-wide text-stone-800 sm:text-3xl/7 md:text-3xl/8 lg:px-0 lg:text-left lg:text-3xl/7 lg:font-semibold lg:text-gray-800">
                Edmontons Complete Interior &
                <span className="block">Exterior House Painting Services</span>
              </h1>

              {/* Sub-subheading */}
              <h2 className="mx-auto w-4/5 text-center text-base font-semibold tracking-wide text-pretty text-stone-600 sm:mx-auto sm:mb-6 sm:text-xl/6 md:mb-6 md:w-2/3 lg:mx-0 lg:mb-4 lg:w-full lg:text-left lg:text-xl/5 lg:text-stone-500 xl:text-2xl">
                Free Estimates from Licensed And Insured Home Painters
                <span className="">Servining Edmonton a Surrounding Area.</span>
              </h2>

              {/* Buttons */}
              <div className="justiyfy-center flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center md:flex-col lg:items-start lg:justify-start xl:flex-row">
                <button
                  type="button"
                  className="w-3/4 max-w-[320px] rounded-lg border border-rose-500 px-8 py-4 text-base font-semibold text-rose-500 transition-colors duration-300 hover:bg-rose-500 hover:text-white"
                >
                  Call For Free Quote Today
                </button>

                <BookQuoteDialog className="w-3/4 max-w-[320px]" />
              </div>
            </div>

            {/* Image Column - Single picture element for all screen sizes */}
            <div className="relative order-0 h-64 md:h-80 lg:order-2 lg:h-auto">
              {true && (
                <picture>
                  {/* Desktop image source */}
                  <source
                    media="(min-width: 1024px)"
                    srcSet="https://res.cloudinary.com/jimbits/image/upload/f_auto,q_auto:eco/v1755015701/roll-on-painting/heroi-8_aavudj.jpg"
                  />
                  {/* Mobile image source */}
                  <source
                    media="(max-width: 1023px)"
                    srcSet="https://res.cloudinary.com/jimbits/image/upload/f_auto,q_auto:eco/v1755015701/roll-on-painting/heroi-8_aavudj.jpg 600w,
                      https://res.cloudinary.com/jimbits/image/upload/f_auto,q_auto:eco/v1755015701/roll-on-painting/heroi-8_aavudj.jpg 800w"
                    sizes="(max-width: 768px) 100vw, (max-width: 1023px) 80vw"
                  />
                  {/* Fallback image */}
                  <img
                    className="h-full w-full rounded-lg object-cover object-bottom shadow-lg lg:rounded-none lg:shadow-none"
                    src="https://res.cloudinary.com/jimbits/image/upload/f_auto,q_auto:eco/v1755015701/roll-on-painting/heroi-8_aavudj.jpg"
                    alt="house in south edmonton at dusk sun going down and the lights are on the newly painted house"
                    loading="eager"
                  />
                </picture>
              )}
            </div>
          </div>
        </div>
      </header>
      <main>
        <ReviewSection className="mt-28 px-4" />
      </main>
    </>
  );
};

export default HomePage;
