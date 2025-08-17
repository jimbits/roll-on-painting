'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { get } from 'http';

interface FormData {
  email: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  projectDescription: string;
}

interface FormErrors {
  email?: string;
  date?: string;
  time?: string;
  appointment?: string; // For combined date/time validation
}

interface BookQuoteFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
  className?: string;
  autoFocus?: boolean;
}

function BookQuoteForm({ 
  onSubmit, 
  onCancel, 
  className,
  autoFocus = true 
}: BookQuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    projectDescription: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus first input when component mounts
  useEffect(() => {
    if (autoFocus && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [autoFocus]);

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return 'Email address is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const validateDate = (date: string): string | undefined => {
    if (!date) {
      return 'Please select a date for your appointment';
    }
    
    // Parse the input date (YYYY-MM-DD format)
    const selectedDate = new Date(date + 'T00:00:00');
    const today = new Date();
    
    // Get today's date without time component
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    
    // Only block past dates, allow today and future dates
    if (selectedDateOnly < todayDateOnly) {
      return 'Please select today or a future date';
    }
    return undefined;
  };

  const validateTime = (time: string): string | undefined => {
    if (!time) {
      return 'Please select a preferred time for your appointment';
    }
    return undefined;
  };

  // Helper function to check if selected date is today
  const isSelectedDateToday = (date: string): boolean => {
    if (!date) return false;
    
    const selectedDate = new Date(date + 'T00:00:00');
    const today = new Date();
    
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    
    return selectedDateOnly.getTime() === todayDateOnly.getTime();
  };
  const validateAppointmentDateTime = (date: string, time: string): string | undefined => {
    if (!date || !time) {
      return undefined; // Individual field validation will catch these
    }

    // Parse the date correctly (YYYY-MM-DD format)
    const selectedDate = new Date(date + 'T00:00:00');
    const today = new Date();
    
    // Get today's date without time component for comparison
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    
    // If appointment is for today, check if time has passed
    if (selectedDateOnly.getTime() === todayDateOnly.getTime()) {
      const [hours, minutes] = time.split(':').map(Number);
      const appointmentDateTime = new Date(selectedDate);
      appointmentDateTime.setHours(hours, minutes, 0, 0);
      
      const now = new Date();
      // Add a 1-hour buffer for scheduling
      const minimumTime = new Date(now.getTime() + (60 * 60 * 1000));
      
      if (appointmentDateTime < minimumTime) {
        return 'For same-day appointments, please select a time at least 1 hour from now';
      }
    }
    
    return undefined;
  };

  // Validation functions (run on submit)
  const validateField = useCallback((name: string, value: string) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'date':
        return validateDate(value);
      case 'time':
        return validateTime(value);
      default:
        return undefined;
    }
  }, []);

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
          hour12: true
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
    const dateError = validateDate(formData.date);
    const timeError = validateTime(formData.time);
    const appointmentError = validateAppointmentDateTime(formData.date, formData.time);
    
    const newErrors = {
      ...(emailError && { email: emailError }),
      ...(dateError && { date: dateError }),
      ...(timeError && { time: timeError }),
      ...(appointmentError && { appointment: appointmentError })
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(formData);
        
        // Reset form on successful submission
        setFormData({
          email: '',
          date: '',
          time: '',
          name: '',
          phone: '',
          projectDescription: ''
        });
        setErrors({});
      } catch (error) {
        // Error handling is managed by parent component
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  return (
  <section>
      <header className="flex items-center justify-between px-6  ">
          <div>
            <h2 id="modal-title" className="text-3xl font-semibold text-gray-900">
              Book Your Free Quote
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Schedule your in-person consultation
            </p>
          </div>

        </header>
      <form onSubmit={handleSubmit} className={cn("overflow-y-auto", className)}>
        <div className="p-6 space-y-6">
          
       
          
          {/* Required Fields Section */}
          <fieldset className=" border border-gray-200 rounded-lg p-4 space-y-2">
            <legend className="text-lg font-semibold text-gray-700 px-2">
              Booking Details <span className="text-xs text-gray-500 font-normal">(<span className="text-red-500  ">*</span> required fields must be completed)</span>
            </legend>
          
          {/* Email - Required */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              ref={firstInputRef}
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={cn(
                "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                errors.email
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              )}
              placeholder="your@email.com"
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>
  
          {/* Date - Required */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarDaysIcon className="inline w-4 h-4 mr-1" />
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={formData.date || getMinDate()}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={getMinDate()}
              className={cn(
                "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                (errors.date || errors.appointment)
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              )}
              aria-required="true"
              aria-invalid={errors.date || errors.appointment ? 'true' : 'false'}
              aria-describedby={errors.date ? 'date-error' : errors.appointment ? 'appointment-error' : undefined}
            />
            {errors.date && (
              <p id="date-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.date}
              </p>
            )}
          </div>
  
          {/* Time - Required */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              <ClockIcon className="inline w-4 h-4 mr-1" />
              Preferred Time <span className="text-red-500">*</span>
            </label>
         
            
            <select
              id="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className={cn(
                "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors",
                (errors.time || errors.appointment)
                  ? "border-red-300 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              )}
              aria-required="true"
              aria-invalid={errors.time || errors.appointment ? 'true' : 'false'}
              aria-describedby={errors.time ? 'time-error' : errors.appointment ? 'appointment-error' : undefined}
            >
              <option value="">Select a time</option>
              {generateTimeOptions().map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
            {errors.time && (
              <p id="time-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.time}
              </p>
            )}
    <legend className="text-lg font-semibold text-gray-700 px-2">
              Additional Information <span className="blocktext-gray-500 text-sm font-normal">(All fields below are optional and can be skipped)</span>
            </legend>
               
            {/* Same-day booking info - always visible */}
            <div className="my-3 bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm mb-2 text-green-800"><span className="font-medium">Business hours:</span>  8:00 AM - 5:30 PM •</p>
              <p className="text-sm text-green-800">
                <span className="font-medium">Same-day booking:</span> For same-day appointments the time must be a minimum of an hour from now
              </p>
            </div>
  
       
          </div>
  
          {/* Combined Date/Time Validation Error */}
          {errors.appointment && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p id="appointment-error" className="text-sm text-red-800" role="alert">
                <span className="font-medium">Scheduling Issue:</span> {errors.appointment}
              </p>
            </div>
          )}
          </fieldset>
  
          {/* Optional Fields Section */}
          <fieldset className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
            <legend className="text-lg font-semibold text-gray-700 px-2">
              Additional Information <span className="blocktext-gray-500 text-sm font-normal">(All fields below are optional and can be skipped)</span>
            </legend>
  
          {/* Name - Optional */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>
  
          {/* Phone - Optional */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                handleInputChange('phone', formatted);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(555) 123-4567"
              maxLength={14}
            />
          </div>
  
          {/* Project Description - Optional */}
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              id="projectDescription"
              value={formData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
              placeholder="Tell us about your project, space, or any specific requirements..."
              maxLength={500}
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.projectDescription.length}/500 characters
            </p>
          </div>
          </fieldset>
        </div>
  
        {/* Footer */}
        <div className="flex justify-end items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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