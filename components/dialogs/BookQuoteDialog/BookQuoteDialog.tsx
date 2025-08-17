'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import BookQuoteForm from './BookQuoteForm'

interface FormData {
  email: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  projectDescription: string;
}

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
      alert('Quote request submitted successfully! We\'ll contact you soon.');
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
          triggerRef.current?.focus();
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className={cn(
          "relative bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[95vh] overflow-hidden",
          "transform transition-all duration-300 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-4 scale-95"
        )}
      >
        {/* Header */}
     <div className='flex justify-end'>
         <button
            onClick={closeModal}
            className="p-2 text- text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
     </div>

        {/* Form */}
        <BookQuoteForm
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          className="max-h-[calc(95vh-120px)]"
          autoFocus={true}
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={triggerRef}
        onClick={openModal}
        type="button"
        className={cn(
          "bg-gradient-to-bl from-blue-500 via-blue-600 to-indigo-600",
          "py-2.5 px-6 rounded-sm text-base font-medium tracking-tight text-white",
          "hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "transition-all duration-200",
          className
        )}
        aria-haspopup="dialog"
      >
        Book A Free Quote Online
      </button>

      {/* Portal for modal */}
      {mounted && modalContent && createPortal(
        modalContent,
        document.body
      )}
    </>
  );
}

export default BookQuoteDialog;

 