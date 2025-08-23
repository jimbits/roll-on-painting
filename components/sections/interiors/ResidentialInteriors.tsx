function ResidentialInteriors() {
  return (
    <section className='mb-16'>
      <header className='pr-8'>
        <h2 className='text-center text-3xl font-extrabold tracking-tight'>
          Interior House Painting Services Edmonton
        </h2>
        <h3 className='mb-4 text-center text-sm font-medium text-orange-500'>
          Transform Your Home with Edmonton&aposs Trusted Interior Painters
        </h3>
      </header>
      <p className='text-copy'>
        Transform your home&aposs interior with Edmonton&aposs most trusted house painters. Roll On
        Painting delivers professional interior house painting services throughout Edmonton, using
        eco-friendly, low-VOC paints that are safe for your family and pets.
      </p>

      <div className='p-1.25 bg-linear-to-tl mb-4 max-w-fit from-red-600 from-15% via-red-500 via-50% to-orange-500 to-75%'>
        <picture>
          <img
            className='w-full'
            src='https://res.cloudinary.com/jimbits/image/upload/f_auto,q_auto:good/v1755315030/roll-on-painting/pouring-paint_aesrfm.avif'
            srcSet='https://res.cloudinary.com/jimbits/image/upload/f_auto,q_auto:eco/v1755315030/roll-on-painting/pouring-paint_aesrfm.avif'
            sizes='100vw'
            alt='house in south edmonton at dusk sun going down and the lights are on the newly painted house '
          />
        </picture>
      </div>
      <p className='text-copy'>
        Roll On Pating handles every detail from surface preparation to final cleanup, ensuring
        beautiful, long-lasting results that enhance your home&aposs value and comfort.
      </p>
      <div className='p-1.25 bg-linear-to-tl mb-4 max-w-fit from-red-600 from-15% via-red-500 via-50% to-orange-500 to-75%'>
        <picture>
          <img
            className='w-full'
            src='https://res.cloudinary.com/jimbits/image/upload/c_scale,w_400/f_auto/q_auto:eco/roll-on-painting/heroi-8_aavudj'
            srcSet='https://res.cloudinary.com/jimbits/image/upload/f_auto,q_auto:eco/v1755013927/roll-on-painting/banner_wgfnse.jpg'
            sizes='100vw'
            alt='house in south edmonton at dusk sun going down and the lights are on the newly painted house '
          />
        </picture>
      </div>
      <p className='mb-4 text-stone-600'>
        Whether you&aposre updating a single room or your entire home.{' '}
      </p>

      <p className='mb-4 text-stone-600'>
        Let our professional painters deliver flawless results that bring your vision to life.{' '}
      </p>

      <table className='w-full table-fixed text-sm shadow-md'>
        <thead>
          <tr className='bg-stone-300'>
            <th colSpan={2} className='bg-gray-500 py-1.5 text-lg font-semibold text-white'>
              Featured Interior Painting Services
            </th>
          </tr>
        </thead>
        <tbody className='bg-white text-center'>
          <tr className='hover:bg-blue-50" odd:bg-white even:bg-gray-50'>
            <td className='p-4 pl-8 text-gray-500'>Living Rooms</td>
            <td className='p-4 text-gray-500'> Bedrooms</td>
          </tr>
          <tr className='hover:bg-blue-50" odd:bg-white even:bg-gray-50'>
            <td className='p-4 pl-8 text-gray-500'>Bathrooms</td>
            <td className='p-4 text-gray-500'> Kitchens</td>
          </tr>
          <tr className='odd:bg-white even:bg-gray-50 hover:bg-blue-50'>
            <td className='p-4 pl-8 text-gray-500'>Cielings</td>
            <td className='p-4 text-gray-500'> Trim</td>
          </tr>
          <tr className='hover:bg-blue-50" odd:bg-white even:bg-gray-50'>
            <td className='p-4 pl-8 text-gray-500'>Doors</td>
            <td className='p-4 text-gray-500'> Windows</td>
          </tr>
          <tr className='odd:bg-white even:bg-gray-50 hover:bg-blue-50'>
            <td className='p-4 pl-8 text-gray-500'>Texturing</td>
            <td className='p-4 text-gray-500'>Windows</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default ResidentialInteriors;
