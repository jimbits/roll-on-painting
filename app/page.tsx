import { MobileMenu } from '@/components/navigation/MobileMenu';
import { PhoneCall } from 'lucide-react';

import ResidentialInteriors from '@/components/landing/ResidentialInteriors';
export default function Home() {
  return (
    <>
      <ul className='flex items-center justify-between pt-2.5 px-4 mb-4'>
        <li>
          <PhoneCall className='stroke-stone-600' />
        </li>
        <li>
          <p className='font-bold text-sm text-stone-500 '> Edmonton Roll On Quality </p>
        </li>
        <li>
          <MobileMenu className='w-6 h-6 stroke-stone-600' />
        </li>
      </ul>
      <header className='    mb-24 sm:bg-red-500  '>
        <p className='mb-1 order-0 text-center md:text-left text-5xl   font-extrabold   bg-[linear-gradient(225deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))]     text-transparent bg-clip-text'>
          Roll On Painting
        </p>

        <h1 className='order-1 mb-4 text-xl md:text-left leading-6  font-bold   text-center   px-8 md:px-0'>
          Edmonton House Painters Interior & Exterior Home Painting Services
        </h1>
        <div className='order-2  '>
          <picture>
            <img
              className='w-full'
              src='https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_560/v1755015701/roll-on-painting/heroi-8_aavudj.jpg'
              srcSet='https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_560/v1755015701/roll-on-painting/heroi-8_aavudj.jpg'
              sizes='100vw'
              alt='house in south edmonton at dusk sun going down and the lights are on the newly painted house '
            />
          </picture>
        </div>
        <div>
          <h2 className=' px-12 text-center my-6 text-2xl     tracking-tighter      text-stone-600 font-bold  mb-4   '>
            Complete House Painting Services Throughout Edmonton
          </h2>
          <h3 className=' mb-3 text-center   font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400'>
            Free Estimates from Licensed & Insured Home Painters
          </h3>
          <div className='flex justify-center gap-3 px-8'>
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
      </header>
      <main className='mt-16 px-4'>
        <ResidentialInteriors />
      </main>
    </>
  );
}
