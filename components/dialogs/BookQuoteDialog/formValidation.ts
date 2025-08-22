 interface FormErrors {
  email?: string;
  phone?: string;    // Add this line
  date?: string;
  time?: string;
  appointment?: string; // For combined date/time validation
}

 interface FormData {
  email: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  projectDescription: string;
}


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

  const validatePhone = (phone: string): string | undefined => {
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    // Remove formatting to check length
    const numbersOnly = phone.replace(/[^\d]/g, '');
    if (numbersOnly.length < 10) {
      return 'Please enter a valid 10-digit phone number';
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


 //Validate both date and time fields for correct format
const validateAppointmentDateTime = (date: string, time: string): string | undefined => {
  if (!date || !time) {
    return undefined; // Individual field validation will catch these
  }

  // Parse the date correctly (YYYY-MM-DD format)
  const selectedDate = new Date(date + 'T00:00:00');
  const today = new Date();

  // Get today's date without time component for comparison
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const selectedDateOnly = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate()
  );

  // If appointment is for today, check if time has passed
  if (selectedDateOnly.getTime() === todayDateOnly.getTime()) {
    const [hours, minutes] = time.split(':').map(Number);
    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    // Add a 1-hour buffer for scheduling
    const minimumTime = new Date(now.getTime() + 60 * 60 * 1000);

    if (appointmentDateTime < minimumTime) {
      return 'For same-day appointments, please select a time at least 1 hour from now';
    }
  }

  return undefined;
};

 

// Explicit exports at the bottom
export type { FormErrors, FormData };
export { 
  validateEmail, 
  validatePhone, 
  validateDate, 
  validateTime,
  validateAppointmentDateTime
}