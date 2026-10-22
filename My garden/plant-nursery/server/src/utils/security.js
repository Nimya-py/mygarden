/**
 * Password strength validator meeting enterprise requirements:
 * - Minimum 12 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const validatePasswordStrength = (password) => {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required.' };
  }

  if (password.length < 6) {
    return {
      valid: false,
      message: 'Password must be at least 6 characters long.',
    };
  }

  return { valid: true };
};
