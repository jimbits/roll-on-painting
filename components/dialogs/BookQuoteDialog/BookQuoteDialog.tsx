'use client';
import { FormData } from './formValidation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import BookQuoteForm from './BookQuoteForm';

interface BookQuoteDialogProps {
  className?: string;
}

function BookQuoteDialog({ className }: BookQuoteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Handle client-side mounting for portals
  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal controls
  const openModal = useCallback(() => {
    setIsOpen(true);
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const closeModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Handle form submission
  const handleFormSubmit = async (formData: FormData) => {
    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Success handling
      console.log('Form submitted:', formData);
      alert("Quote request submitted successfully! We'll contact you soon.");
      closeModal();
    } catch (error) {
      alert('There was an error submitting your request. Please try again.');
      throw error; // Re-throw so form can handle the error state
    }
  };

  // Handle form cancellation
  const handleFormCancel = () => {
    closeModal();
  };

  // Remove modal from DOM after animation
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

  // Keyboard event handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      }

      // Focus trap
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = isOpen ? (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center sm:p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={closeModal}
        aria-hidden='true'
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className={cn(
          // Mobile: full screen
          'relative max-h-[100svh] w-screen max-w-[100vw] overflow-hidden rounded-lg bg-white shadow-xl',
          'transform transition-all duration-300 ease-out',
          // Desktop: centered with constraints
          'sm:h-auto sm:max-h-[90vh] sm:w-auto sm:max-w-2xl sm:rounded-lg',
          'transform transition-all duration-300 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Header */}
        <div className='flex justify-end'>
          <button
            onClick={closeModal}
            className='rounded-full p-2 text-base text-gray-400 transition-colors hover:bg-gray-100 hover:text-stone-600'
            aria-label='Close dialog'
          >
            <XMarkIcon className='h-5 w-5' />
          </button>
        </div>

        {/* Form */}
        <BookQuoteForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          className='max-h-[calc(95vh-120px)]'
          autoFocus={false}
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        onClick={openModal}
        type='button'
        className={cn(
          'rounded-lg bg-indigo-500 px-8 py-4 text-base font-semibold text-white transition-colors duration-300 hover:bg-indigo-600',
          'transition-all duration-200', className
        )}
        aria-haspopup='dialog'
      >
        Book A Free Quote Online
      </button>

      {/* Portal for modal */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}

export default BookQuoteDialog;
