/**
 * Utility functions for WhatsApp redirection with pre-setup message
 */

/**
 * Strips non-digits and standardizes the WhatsApp number with country code.
 * E.g., '9447312890' -> '919447312890'
 *       '+91 94473 12890' -> '919447312890'
 *       '09447312890' -> '919447312890'
 */
export const getCleanWhatsAppNumber = (phone) => {
  if (!phone) return '919447312890';
  let digits = String(phone).replace(/[^0-9]/g, '');
  if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }
  if (digits.length === 10) {
    digits = `91${digits}`;
  }
  return digits || '919447312890';
};

/**
 * Builds a direct wa.me link with encoded pre-setup message
 * @param {string} phone - Raw business phone or WhatsApp number
 * @param {string} message - Pre-setup text message to open in WhatsApp chat
 * @returns {string} - wa.me URL
 */
export const getWhatsAppUrl = (phone, message = '') => {
  const cleanNumber = getCleanWhatsAppNumber(phone);
  const encodedText = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleanNumber}${encodedText ? `?text=${encodedText}` : ''}`;
};
