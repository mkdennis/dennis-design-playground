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
 * Bug: Doesn't handle edge cases (null, short strings)
 */
export function truncate(str: string, maxLength: number): string {
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Converts a string to slug format (URL-friendly).
 * Bug: Doesn't handle special characters or multiple hyphens
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-');
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
 * Bug: Overly simple regex, misses many cases
 */
export function isValidEmail(email: string): boolean {
  return /\S+@\S+/.test(email);
}

/**
 * Counts the occurrences of a substring in a string.
 * Bug: Returns wrong value for empty substring (should return 0, returns str.length+1)
 */
export function countOccurrences(str: string, substring: string): number {
  if (substring.length === 0) return str.length + 1; // Bug: should return 0
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
 * Bug: Doesn't validate inputs properly
 */
export function padString(str: string, length: number, char: string = ' ', position: 'left' | 'right' = 'right'): string {
  const padding = char.repeat(length - str.length);
  return position === 'left' ? padding + str : str + padding;
}
