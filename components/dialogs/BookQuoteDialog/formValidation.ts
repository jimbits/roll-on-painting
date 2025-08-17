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
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return 'Please select a future date';
    }
    return undefined;
  };

  const validateTime = (time: string): string | undefined => {
    if (!time) {
      return 'Please select a preferred time for your appointment';
    }
    return undefined;
  };

  export {validateDate, validateEmail, validateTime}
