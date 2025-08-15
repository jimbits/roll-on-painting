'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
interface MobileMenuProps {
  className?: string;
}

function MobileMenu({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Open modal
  const openModal = () => {
    setIsOpen(true);
    requestAnimationFrame(() => setIsVisible(true));
  };

  // Close modal (fade-out)
  const closeModal = () => {
    setIsVisible(false);
  };

  // Remove modal from DOM after fade-out
  useEffect(() => {
    if (!isVisible && isOpen && modalRef.current) {
      const handleTransitionEnd = (event: TransitionEvent) => {
        if (event.target === modalRef.current) {
          setIsOpen(false);
        }
      };
      const el = modalRef.current;
      el.addEventListener('transitionend', handleTransitionEnd);
      return () => el.removeEventListener('transitionend', handleTransitionEnd);
    }
  }, [isVisible, isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='text-zinc-700     transition-colors'
        aria-label='Open navigation menu'
        aria-expanded='false'
        aria-controls='main-menu'
      >
        <Menu className={cn('w-8 h-8  ', className)} />
      </button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isVisible ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={closeModal}
          />

          {/* Modal content */}
          <div
            ref={modalRef}
            className={`relative bg-white p-6 rounded shadow-lg transform transition-all duration-300
              ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <h2 className='text-xl font-bold mb-4'>Hello!</h2>
            <p className='mb-4'>This modal now closes with Esc or clicking the backdrop.</p>
            <button
              onClick={closeModal}
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
