function ResidentialInteriors() {
  return (
    <section className='mb-16 '>
      <header className='pr-8'>
        <h2 className='text-3xl tracking-tight font-extrabold text-center '>
          Interior House Painting Services Edmonton
        </h2>
        <h3 className='text-sm mb-4 text-orange-500 font-medium text-center'>
          Transform Your Home with Edmonton’s Trusted Interior Painters
        </h3>
      </header>
      <p className='text-stone-600 mb-4'>
        Transform your home's interior with Edmonton's most trusted house painters. Roll On Painting
        delivers professional interior house painting services throughout Edmonton, using
        eco-friendly, low-VOC paints that are safe for your family and pets.
      </p>
      <div className='p-1.25 mb-4 max-w-fit  bg-linear-to-tl from-red-600 from-15% via-red-500 via-50% to-orange-500 to-75%'>
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
      <p className='text-stone-600 mb-4'>
        Roll On Pating handles every detail from surface preparation to final cleanup, ensuring
        beautiful, long-lasting results that enhance your home's value and comfort.
      </p>
      <div className='p-1.25  mb-4 max-w-fit  bg-linear-to-tl from-red-600 from-15% via-red-500 via-50% to-orange-500 to-75%'>
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
      <p className='text-stone-600 mb-4'>
        Whether you’re updating a single room or your entire home.{' '}
      </p>

      <p className='text-stone-600 mb-4'>
        Let our professional painters deliver flawless results that bring your vision to life.{' '}
      </p>

      <table className='w-full table-fixed border-collapse    text-sm'>
        <thead className='border-1 border-orange-300  '>
          <tr className='bg-stone-300'>
            <th
              colSpan={2}
              className='bg-linear-to-tl from-red-600 from-15% via-red-500 via-50% to-orange-500 to-75% text-lg py-1.5  font-semibold text-white dark:border-gray-600 dark:text-gray-200  '
            >
              Interior Painting Services
            </th>
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-gray-800 border border-orange-300 text-center'>
          <tr>
            <td className='  border-r border-orange-300 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400'>
              Living Rooms
            </td>
            <td className='  p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400'>
              {' '}
              Bedrooms
            </td>
          </tr>
          <tr className='bg-orange-50'>
            <td className='  border-r border-orange-300 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400'>
              Bathrooms
            </td>
            <td className='  p-4 text-gray-500 dark:border-gray-700 dark:text-gray-400'>
              {' '}
              Kitchens
            </td>
          </tr>
          <tr>
            <td className='  border-r border-orange-300 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
              Cielings
            </td>
            <td className='    p-4 text-gray-500 dark:border-gray-600 dark:text-gray-400'> Trim</td>
          </tr>
          <tr className='bg-orange-50'>
            <td className='  border-r border-orange-300 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
              Doors
            </td>
            <td className='    p-4 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
              {' '}
              Windows
            </td>
          </tr>
          <tr>
            <td className=' border-b border-r border-orange-300 p-4 pl-8 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
              Texturing
            </td>
            <td className='border-b border-orange-300 p-4 text-gray-500 dark:border-gray-600 dark:text-gray-400'>
              Windows
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default ResidentialInteriors;
