import { MobileMenu } from '@/components/navigation/MobileMenu';
import { PhoneCall, CalculatorIcon } from 'lucide-react';
import Image from 'next/image';
export default function Home() {
  return (
    <>
      <ul className='flex items-center justify-between pt-1.5 px-4 '>
        <li>
          <PhoneCall />
        </li>
        <li className='flex flex-col items-center'></li>
        <li>
          <MobileMenu className='w-6 h-6' />
        </li>
      </ul>
      <header className='text-center flex flex-col items-center   '>
        <h1 className='text-xl tracking-tight  text-stone-800 font-semibold order-1   '>
          Residential Interior & Exterior Painting in Edmonton
        </h1>
        <h2 className='order-0 text-5xl font-extrabold bg-linear-to-bl from-pink-500 via-red-500 to-orange-500     text-transparent bg-clip-text'>
          Roll On Painting
        </h2>
        <Image
          src='/hero/hero-14.webp'
          alt='planning a painting project'
          width={800}
          height={650}
          className='order-2'
        />

        <h3 className='order-4 text-left  font-semibold text-stone-800 px-6 leading-5  '>
          Roll on quality Edmonton increase your home’s value and curb appeal with professional
          interior and exterior painting services that protect and refresh every space.
        </h3>
      </header>
      <div className='min-h-screen  '>
        <div className='p-8'>
          <div className='space-y-4'>
            <div className='w-fit text-white font-semibold text-center bg-linear-to-r from-rose-500 via-pink-500 to-red-500  rounded-sm px-5 py-2.5 '>
              Call Now For A Free Quote
              <span className='text-xs block font-light   '> calls are free </span>
            </div>
            <div className='flex flex-col justify-center items-center w-fit bg-linear-to-bl from-blue-500 from-15% via-indigo-500 via-35% to-indigo-600  to-85% rounded-sm px-5 py-2.5  '>
              {/* <CalculatorIcon className='w-8 h-8 stroke-1 stroke-white' /> */}
              <p className='text-white text-lg font-semibold text-center '>
                Get A Quick Estimate
                <span className='text-sm block font-normal   '>Try our painting estimator.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
