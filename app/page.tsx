import { MobileMenu } from '../components/navigation/MobileMenu';
import { Modal } from '../components/navigation/MobileMenu';
export default function Home() {
  return (
    <>
      <div className='min-h-screen bg-background hidden'>
        <div className='p-8'>
          <h1 className='text-3xl font-bold mb-4'>Roll On Painting</h1>
          <p className='text-gray-600 mb-8'>
            Professional painting services for residential and commercial properties.
          </p>
          <div className='space-y-4'>
            <div className='h-32 bg-gray-100 rounded-lg'></div>
            <div className='h-32 bg-gray-100 rounded-lg'></div>
            <div className='h-32 bg-gray-100 rounded-lg'></div>
          </div>
        </div>
      </div>
      <Modal />
      <MobileMenu />
    </>
  );
}
