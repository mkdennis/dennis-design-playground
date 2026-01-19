/**
 * String Utilities Module
 *
 * This module contains intentional bugs and missing edge cases
 * for demonstrating the Ralph Wiggum iterative fix technique.
 */

/**
 * Capitalizes the first letter of each word in a string.
 * Bug: Doesn't handle multiple spaces correctly
 */
export function titleCase(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Truncates a string to a specified length and adds ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (maxLength <= 0 || str.length === 0) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Converts a string to slug format (URL-friendly).
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Reverses the words in a string (not the characters).
 * Bug: Breaks on empty strings and extra whitespace
 */
export function reverseWords(str: string): string {
  return str.split(' ').reverse().join(' ');
}

/**
 * Checks if a string is a valid email format.
 */
export function isValidEmail(email: string): boolean {
  if (/\.\./.test(email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Counts the occurrences of a substring in a string.
 */
export function countOccurrences(str: string, substring: string): number {
  if (substring.length === 0) return 0;
  let count = 0;
  let pos = 0;
  while ((pos = str.indexOf(substring, pos)) !== -1) {
    count++;
    pos += substring.length;
  }
  return count;
}

/**
 * Pads a string to a specified length with a given character.
 */
export function padString(str: string, length: number, char: string = ' ', position: 'left' | 'right' = 'right'): string {
  if (str.length >= length) return str;
  const padLength = length - str.length;
  let padding: string;
  if (char.length > 1) {
    padding = ' ' + char.repeat(Math.ceil(padLength / char.length));
  } else {
    padding = char.repeat(padLength);
  }
  return position === 'left' ? padding + str : str + padding;
}
