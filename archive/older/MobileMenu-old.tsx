'use client';
import { Menu } from 'lucide-react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
interface MobileMenuProps {
  children?: ReactNode;
  className?: string;
}

function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  function closeDialog() {
    setIsVisible(false);
    if (dialogRef.current) {
      setTimeout(() => {
        const dialog = dialogRef.current;
        if (dialog) {
          dialog.close();
        }
      }, 500); // Match fade-out duration
    }
  }
  function openDialog() {
    if (dialogRef.current) {
      setIsVisible(false);
      dialogRef.current.showModal();
      setTimeout(() => setIsVisible(true), 50);
    }
  }
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
  }, []);
  return (
    <>
      <Menu onClick={openDialog} className='w-8 h-8 fixed right-4 top-4' />

      <dialog
        ref={dialogRef}
        className={cn(
          '  fixed inset-0   ',
          `fade-dialog ${isVisible ? 'fade-dialog--visible' : 'fade-dialog--hidden'}`
        )}
      >
        <div className=' w-screen bg-red-500 min-h-screen  p-8'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Confirm Action</h2>
          <p className='text-gray-600 mb-6'>
            Are you sure you want to proceed with this action? This cannot be undone.
          </p>

          <div className='flex gap-3 justify-end'>
            <button
              onClick={closeDialog}
              className='px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={closeDialog}
              className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors'
            >
              Confirm
            </button>
          </div>
        </div>
        {/* <section className='  w-screen h-screen   bg-red-500     '>
          <header className='flex justify-between py-2 px-4 items-center '>
            <h2 className='text-3xl font-bold h-12'>Roll On Painting</h2>
            <button
              type='button'
              className=' shadow-md border rounded-md w-8 h-8 place-items-center'
            >
              <X className='stroke-zinc-500 stroke-2' onClick={closeModal} />
            </button>
          </header>
          <div className=' '>
            <p>Greetings, one and all!</p>
          </div>
        </section> */}
      </dialog>
    </>
  );
}

export default MobileMenu;
