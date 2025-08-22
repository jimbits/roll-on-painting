import { BookQuoteDialog } from "@/components/dialogs/BookQuoteDialog";
import PhoneAction from "@/components/actions/PhoneLink";
import {MobileMenu} from "@/components/dialogs/MobileMenu"

const HomePage = () => {
  return (
  <> 
   <ul className='mb-0 flex items-center justify-between px-4 pt-2.5'>
        <li>
        <PhoneAction/>
        </li>
        <li>
          <p className='text-sm font-bold text-stone-500'>Roll On Quality  Edmonton  </p>
        </li>
        <li>
          <MobileMenu/>
        </li>
      </ul>
    <header className="relative min-h-screen    ">
         {/* Company Name - Mobile vs Desktop styling */}
            <p className= ' bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))]  bg-clip-text  text-center text-4xl   font-extrabold text-transparent'>
              Roll On Painting
            </p>
         {/* Subheading */}
            <h1 className='px-5 leading-5   lg:px-0 text-center lg:text-left text-lg lg:text-3xl xl:text-4xl font-bold lg:font-semibold tracking-tighter text-stone-600 lg:text-gray-800'>
              Edmontons Complete  Interior & Exterior House Painting Services
            </h1>
      {/* Container with responsive padding */}
      <div className="container mx-auto px-2 py-2.5 lg:py-8">
        
        {/* Single Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 lg:items-center lg:min-h-[80vh]">
          
          {/* Content Column */}
          <div className="space-y-6 order-2 lg:order-1">
         
            
           
         
            
            {/* Sub-subheading */}
            <h2 className=' mb-0 text-pretty text-center text-sm font-bold lg:text-left  lg:text-xl xl:text-2xl text-zinc-600 lg:text-gray-600 sm:text-xl/8 dark:text-gray-400'>
              Free Estimates from Licensed And Insured Home Painters In Edmonton a Surrounding Areas
            </h2>
            
            {/* Buttons */}
            <div className="flex flex-col   sm:flex-row  sm:justify-center gap-4 pt-4">
              <button className="bg-pink-500 hover:bg-pink-600 text-white  font-semibold py-4 px-8 rounded-lg transition-colors duration-300 text-lg shadow-lg hover:shadow-xl  ">
                Call For Free Quote Today
              </button>
              <BookQuoteDialog/>
            </div>
          </div>

          {/* Image Column - Single picture element for all screen sizes */}
          <div className="relative h-64 md:h-80 lg:h-auto order-1 lg:order-2">
            <picture>
              {/* Desktop image source */}
              <source 
                media="(min-width: 1024px)" 
                srcSet="https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:low,w_600/v1755015702/roll-on-painting/hero_qguyoq.png"
              />
              {/* Mobile image source */}
              <source 
                media="(max-width: 1023px)" 
                srcSet="https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_560/v1755015701/roll-on-painting/heroi-8_aavudj.jpg 560w,
                        https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_800/v1755015701/roll-on-painting/heroi-8_aavudj.jpg 800w"
                sizes="(max-width: 768px) 100vw, (max-width: 1023px) 80vw"
              />
              {/* Fallback image */}
              <img
                className='w-full h-full object-cover object-bottom rounded-lg lg:rounded-none shadow-lg lg:shadow-none'
                src='https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_560/v1755015701/roll-on-painting/heroi-8_aavudj.jpg'
                alt='house in south edmonton at dusk sun going down and the lights are on the newly painted house'
                loading="eager"
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