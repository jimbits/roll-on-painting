import MobileMenuWithButton from '@/components/dialogs/MobileMenu/MobileMenu';
import Link from 'next/link';
import ResidentialInteriors from '@/components/sections/interiors/ResidentialInteriors';
import PhoneAction from '@/components/actions/PhoneLink';
import { BookQuoteDialog } from '@/components/dialogs/BookQuoteDialog';
export default function Home() {
  return (
    <>
      <ul className="mb-4 flex items-center justify-between px-4 pt-2.5">
        <li>
          <PhoneAction />
        </li>
        <li>
          <p className="text-sm font-bold text-stone-500"> Edmonton Roll On Quality </p>
        </li>
        <li>
          <MobileMenuWithButton />
        </li>
      </ul>
      <header className="lg-grid-cols-2 lg-grid-rows-1 mb-24 lg:grid lg:gap-8">
        <p className="mb-1 bg-linear-to-br from-pink-500 via-red-500 to-orange-500 bg-clip-text text-center text-5xl leading-[58px] font-extrabold text-transparent">
          Roll On Painting
        </p>

        <h1 className="-mt-1 mb-4 px-8 text-center text-xl leading-6 font-bold md:px-0 md:text-left">
          Edmonton House Painters Interior & Exterior Home Painting Services
        </h1>
        <div className="lg:col-start-2 lg:col-end-3">
          <picture>
            <img
              className="w-full"
              src="https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_560/v1755015701/roll-on-painting/heroi-8_aavudj.jpg"
              srcSet="https://res.cloudinary.com/jimbits/image/upload/c_scale,f_auto,q_auto:good,w_560/v1755015701/roll-on-painting/heroi-8_aavudj.jpg"
              sizes="100vw"
              alt="house in south edmonton at dusk sun going down and the lights are on the newly painted house "
            />
          </picture>
        </div>
        <div>
          <h2 className="my-6 mb-4 px-12 text-center text-2xl font-bold tracking-tighter text-stone-600">
            Complete House Painting Services Throughout Edmonton
          </h2>
          <h3 className="mb-3 text-center font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-400">
            Free Estimates from Licensed & Insured Home Painters
          </h3>
          <div className="flex justify-center gap-3 px-8">
            <button
              type="button"
              className="flex-1/2 rounded-sm bg-linear-to-tr from-rose-600 via-rose-500 to-rose-600 py-2.5 text-center text-base font-medium tracking-tight text-white"
            >
              Call For Free Quote Today
            </button>
            <BookQuoteDialog />
          </div>
        </div>
      </header>
      <main className="mt-16 px-4">
        <ResidentialInteriors />

        <header>
          <p>company name</p>
          <h1>Main Heading</h1>
          <h2>Sub heading</h2>
          <h3>Sub Heading</h3>
          <div>
            <button>Call to action</button>
            <button>Call to action</button>
          </div>

          <img src="img/asset.jpg" alt="title" />
        </header>
      </main>
    </>
  );
}
