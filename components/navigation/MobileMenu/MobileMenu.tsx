'use client';

import { useState, useRef, useEffect } from 'react';
import { Bars4Icon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
interface MobileMenuProps {
  className?: string;
}

function MobileMenu({ className }: MobileMenuProps) {
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
        className='text-zinc-700 transition-colors'
        aria-label='Open navigation menu'
        aria-expanded='false'
        aria-controls='main-menu'
      >
        <Bars4Icon className={cn('h-12 w-12 stroke-red-400', className)} />
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
            className={`relative transform rounded bg-white p-6 shadow-lg transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          >
            <h2 className='mb-4 text-xl font-bold'>Hello!</h2>
            <p className='mb-4'>This modal now closes with Esc or clicking the backdrop.</p>
            <button
              onClick={closeModal}
              className='rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600'
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
