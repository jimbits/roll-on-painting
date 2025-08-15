'use client';
import { useRef, useState, useEffect } from 'react';

function Modal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Open modal
  const openDialog = () => {
    setIsOpen(true);
  };

  // Close modal with fade-out
  const closeDialog = () => {
    setIsVisible(false);
  };

  // Sync dialog open/close with visibility
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      // Trigger fade-in on next frame
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      // Wait for fade-out to finish before closing
      const handleTransitionEnd = (event: TransitionEvent) => {
        // Only close when the dialog content transitions
        if ((event.target as HTMLElement).classList.contains('dialog-content')) {
          dialog.close();
          dialog.removeEventListener('transitionend', handleTransitionEnd);
        }
      };
      dialog.addEventListener('transitionend', handleTransitionEnd);
    }
  }, [isOpen]);

  return (
    <>
      <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={openDialog}>
        Open Modal
      </button>

      <dialog
        ref={dialogRef}
        className={`
          fixed inset-0 flex items-center justify-center border-0 p-0 bg-transparent
          transition-opacity duration-300
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div
          className={`
            dialog-content
            bg-white p-6 rounded shadow-lg transform transition-all duration-300
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        >
          <h2 className='text-xl font-bold mb-4'>Hello!</h2>
          <p className='mb-4'>This is a smooth fade-in/out modal in TypeScript.</p>
          <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={closeDialog}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
