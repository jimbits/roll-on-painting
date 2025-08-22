'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { CalendarDaysIcon, ClockIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import type { FormErrors, FormData } from './formValidation';
import { 
  validateEmail, 
  validatePhone, 
  validateDate, 
  validateTime,
 validateAppointmentDateTime  
} from './formValidation';

 
 
interface BookQuoteFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
  className?: string;
  autoFocus?: boolean;
}

function BookQuoteForm({ onSubmit, onCancel, className, autoFocus = true }: BookQuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBookingInfo, setShowBookingInfo] = useState(false);

  // Helper functions for default values
  const getCurrentDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getCurrentTimePlusOneHour = (): string => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    // Round to nearest 30-minute interval
    const minutes = oneHourLater.getMinutes();
    const roundedMinutes = minutes <= 30 ? 30 : 60;

    if (roundedMinutes === 60) {
      oneHourLater.setHours(oneHourLater.getHours() + 1);
      oneHourLater.setMinutes(0);
    } else {
      oneHourLater.setMinutes(30);
    }

    const hours = oneHourLater.getHours();
    const mins = oneHourLater.getMinutes();

    // Check if time is within business hours (8 AM - 5:30 PM)
    if (hours < 8) {
      return '08:00'; // Default to 8 AM if too early
    } else if (hours > 17 || (hours === 17 && mins > 30)) {
      return '08:00'; // Default to 8 AM next day (user will need to change date)
    }

    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Form state with default values
  const [formData, setFormData] = useState<FormData>({
    email: '',
    date: getCurrentDate(),
    time: getCurrentTimePlusOneHour(),
    name: '',
    phone: '',
    projectDescription: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const firstInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus first input when component mounts
  useEffect(() => {
    if (autoFocus && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [autoFocus]);


 

  // Helper function to check if selected date is today
  const isSelectedDateToday = (date: string): boolean => {
    if (!date) return false;

    const selectedDate = new Date(date + 'T00:00:00');
    const today = new Date();

    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const selectedDateOnly = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    return selectedDateOnly.getTime() === todayDateOnly.getTime();
  };
 
 

 // Handle input changes - no validation during typing
const handleInputChange = (name: keyof FormData, value: string) => {
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Clear any existing error for this field when user starts typing
  if (errors[name as keyof FormErrors]) {
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  }
  
  // Clear appointment error when date or time changes
  if ((name === 'date' || name === 'time') && errors.appointment) {
    setErrors(prev => ({
      ...prev,
      appointment: undefined
    }));
  }
};

  // Format phone number
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Get minimum date (today)
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Generate time options
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        times.push({ value: timeString, label: displayTime });
      }
    }
    return times;
  };

  // Form submission with validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all required fields on submit
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone); // Add this line
    const dateError = validateDate(formData.date);
    const timeError = validateTime(formData.time);
    const appointmentError = validateAppointmentDateTime(formData.date, formData.time);

    const newErrors = {
      ...(emailError && { email: emailError }),
      ...(phoneError && { phone: phoneError }), // Add this line
      ...(dateError && { date: dateError }),
      ...(timeError && { time: timeError }),
      ...(appointmentError && { appointment: appointmentError }),
    };

    setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
  try {
    await onSubmit(formData);
    
    // Reset form on successful submission
    setFormData({
      email: '',
      date: getCurrentDate(),                    // Keep current date
      time: getCurrentTimePlusOneHour(),         // Keep default time  
      name: '',
      phone: '',                                 // Reset phone to empty
      projectDescription: ''
    });
    setErrors({});                               // Clear all errors
  } catch (error) {
    // Error handling is managed by parent component
    console.error('Form submission error:', error);
  }
}
    setIsSubmitting(false);
  };

  return (
    <section>
      <header className='flex items-center justify-between px-6'>
        <div>
          <h2 id='modal-title' className='text-3xl font-semibold text-gray-900'>
            Book Your Free Quote
          </h2>
          
          <p className='mt-1 text-sm text-stone-600'>Schedule your in-person consultation</p>
            {/* Same-day booking info - collapsible */}
              <div className='my-3'>
                <button
                  type="button"
                  onClick={() => setShowBookingInfo(!showBookingInfo)}
                  className='flex w-full items-center justify-between rounded-md border border-green-200 bg-green-50 p-3 text-left transition-colors hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                  aria-expanded={showBookingInfo}
                  aria-controls="booking-info-content"
                >
                  <span className='text-sm font-medium text-green-800'>
                    Same-day booking information
                  </span>
                  {showBookingInfo ? (
                    <ChevronUpIcon className='h-4 w-4 text-green-600' />
                  ) : (
                    <ChevronDownIcon className='h-4 w-4 text-green-600' />
                  )}
                </button>
                
                {showBookingInfo && (
                  <div 
                    id="booking-info-content"
                    className='mt-2 rounded-md border border-green-200 bg-green-50 p-3'
                  >
                    <p className='mb-2 text-sm text-green-800'>
                      <span className='font-medium'>Business hours:</span> 8:00 AM - 5:30 PM
                    </p>
                    <p className='text-sm text-green-800'>
                      <span className='font-medium'>Same-day booking:</span> For same-day appointments
                      the time must be a minimum of an hour from now
                    </p>
                  </div>
                )}
              </div>
            <span className='block text-xs font-normal text-gray-500'>
                (<span className='text-red-500'>*</span> required fields must be completed)
              </span>
        </div>
      </header>
      <form onSubmit={handleSubmit} className={cn('overflow-y-auto', className)}>
        <div className='space-y-6 p-6'>
          {/* Required Fields Section */}
          <fieldset className='space-y-3    '>
          

            {/* Email - Required */}
            <div>
              <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-700'>
                Email Address <span className='text-red-500'>*</span>
              </label>
              {/* Email Input */}
              <input
                ref={firstInputRef}
                type='email'
                id='email'
                name='email'
                inputMode='email'
                autoComplete='email'
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={cn(
                  'w-full rounded-md border px-3 py-2 transition-colors focus:outline-none focus:ring-2',
                  errors.email
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                )}
                placeholder='your@email.com'
                aria-required='true'
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id='email-error' className='mt-1 text-sm text-red-600' role='alert'>
                  {errors.email}
                </p>
              )}
            </div>

         
            {/* Phone Number - Required */}
            <div>
              <label htmlFor='phone' className='mb-2 block text-sm font-medium text-gray-700'>
                Phone Number <span className='text-red-500'>*</span> 
              </label>
              <input
                id='phone'
                type='tel'
                name='phone'
                autoComplete='tel'
                inputMode='tel'
                value={formData.phone}
                onChange={e => {
                  const formatted = formatPhoneNumber(e.target.value);
                  handleInputChange('phone', formatted);
                }}
                className={cn(
                  'w-full rounded-md border px-3 py-2 transition-colors focus:outline-none focus:ring-2',
                  errors.phone // Add error styling
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                )}
                placeholder='(780) 433-4567'
                maxLength={14}
                aria-required='true' // Add accessibility
                aria-invalid={errors.phone ? 'true' : 'false'} // Add accessibility
                aria-describedby={errors.phone ? 'phone-error' : undefined} // Add accessibility
              />
              {errors.phone && ( // Add error message display
                <p id='phone-error' className='mt-1 text-sm text-red-600' role='alert'>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Date - Required */}
            <div>
              <label htmlFor='date' className='mb-2 block text-sm font-medium text-gray-700'>
                <CalendarDaysIcon className='mr-1 inline h-4 w-4' />
                Preferred Date <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                id='date'
                name='date'
                value={formData.date}
                onChange={e => handleInputChange('date', e.target.value)}
                min={getMinDate()}
                className={cn(
                  'w-full rounded-md border px-3 py-2 transition-colors focus:outline-none focus:ring-2',
                  errors.date || errors.appointment
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                )}
                aria-required='true'
                aria-invalid={errors.date || errors.appointment ? 'true' : 'false'}
                aria-describedby={
                  errors.date ? 'date-error' : errors.appointment ? 'appointment-error' : undefined
                }
              />
              {errors.date && (
                <p id='date-error' className='mt-1 text-sm text-red-600' role='alert'>
                  {errors.date}
                </p>
              )}
            </div>

            {/* Time - Required */}
            <div>
              <label htmlFor='time' className='mb-2 block text-sm font-medium text-gray-700'>
                <ClockIcon className='mr-1 inline h-4 w-4' />
                Preferred Time <span className='text-red-500'>*</span>
              </label>

              <select
                id='time'
                value={formData.time}
                name='time'
                onChange={e => handleInputChange('time', e.target.value)}
                className={cn(
                  'w-full rounded-md border px-3 py-2 transition-colors focus:outline-none focus:ring-2',
                  errors.time || errors.appointment
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                )}
                aria-required='true'
                aria-invalid={errors.time || errors.appointment ? 'true' : 'false'}
                aria-describedby={
                  errors.time ? 'time-error' : errors.appointment ? 'appointment-error' : undefined
                }
              >
                <option value=''>Select a time</option>
                {generateTimeOptions().map(time => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </select>
              {errors.time && (
                <p id='time-error' className='mt-1 text-sm text-red-600' role='alert'>
                  {errors.time}
                </p>
              )}
              
            
            </div>

            {/* Combined Date/Time Validation Error */}
            {errors.appointment && (
              <div className='rounded-md border border-red-200 bg-red-50 p-3'>
                <p id='appointment-error' className='text-sm text-red-800' role='alert'>
                  <span className='font-medium'>Scheduling Issue:</span> {errors.appointment}
                </p>
              </div>
            )}
          </fieldset>
        </div>

        {/* Footer */}
        <div className='flex items-center  justify-center border-t  py-4 bg-stone-100'>
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={onCancel}
              className='rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50'
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className={cn(
                'rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              )}
            >
              {isSubmitting ? 'Submitting...' : 'Request Free Quote'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default BookQuoteForm;