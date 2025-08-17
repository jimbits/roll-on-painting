// components/CallToAction.jsx
import Link from 'next/link';
import { PhoneIcon } from '@heroicons/react/24/outline';
export default function PhoneAction() {
  return (
    <Link href="tel:+17807225544">
      
       <PhoneIcon className='h-6 w-6 inline-block mr-2 text-gray-500' />
      
    </Link>
  );
}