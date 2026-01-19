import {
  titleCase,
  truncate,
  slugify,
  reverseWords,
  isValidEmail,
  countOccurrences,
  padString,
} from '../src/string-utils';

describe('titleCase', () => {
  it('capitalizes first letter of each word', () => {
    expect(titleCase('hello world')).toBe('Hello World');
  });

  it('handles single word', () => {
    expect(titleCase('hello')).toBe('Hello');
  });

  it('handles multiple spaces between words', () => {
    expect(titleCase('hello  world')).toBe('Hello  World');
  });

  it('handles empty string', () => {
    expect(titleCase('')).toBe('');
  });

  it('handles already capitalized text', () => {
    expect(titleCase('HELLO WORLD')).toBe('Hello World');
  });
});

describe('truncate', () => {
  it('truncates long strings', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
  });

  it('returns original if shorter than max', () => {
    expect(truncate('hi', 10)).toBe('hi');
  });

  it('handles exact length', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });

  it('handles empty string', () => {
    expect(truncate('', 5)).toBe('');
  });

  it('handles maxLength of 0', () => {
    expect(truncate('hello', 0)).toBe('');
  });
});

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('handles multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('handles leading/trailing spaces', () => {
    expect(slugify('  hello world  ')).toBe('hello-world');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('collapses multiple hyphens', () => {
    expect(slugify('hello - - world')).toBe('hello-world');
  });
});

describe('reverseWords', () => {
  it('reverses word order', () => {
    expect(reverseWords('hello world')).toBe('world hello');
  });

  it('handles single word', () => {
    expect(reverseWords('hello')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(reverseWords('')).toBe('');
  });

  it('preserves multiple spaces', () => {
    expect(reverseWords('a  b  c')).toBe('c  b  a');
  });
});

describe('isValidEmail', () => {
  it('accepts valid email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  it('rejects missing @', () => {
    expect(isValidEmail('testexample.com')).toBe(false);
  });

  it('rejects missing domain', () => {
    expect(isValidEmail('test@')).toBe(false);
  });

  it('rejects missing local part', () => {
    expect(isValidEmail('@example.com')).toBe(false);
  });

  it('rejects spaces in email', () => {
    expect(isValidEmail('test @example.com')).toBe(false);
  });

  it('accepts email with subdomain', () => {
    expect(isValidEmail('test@mail.example.com')).toBe(true);
  });

  it('accepts email with plus sign', () => {
    expect(isValidEmail('test+tag@example.com')).toBe(true);
  });

  it('rejects double dots', () => {
    expect(isValidEmail('test..name@example.com')).toBe(false);
  });
});

describe('countOccurrences', () => {
  it('counts basic occurrences', () => {
    expect(countOccurrences('hello hello', 'hello')).toBe(2);
  });

  it('returns 0 for no matches', () => {
    expect(countOccurrences('hello', 'world')).toBe(0);
  });

  it('handles empty string', () => {
    expect(countOccurrences('', 'hello')).toBe(0);
  });

  it('handles empty substring', () => {
    expect(countOccurrences('hello', '')).toBe(0);
  });

  it('is case sensitive by default', () => {
    expect(countOccurrences('Hello hello', 'hello')).toBe(1);
  });
});

describe('padString', () => {
  it('pads string to the right', () => {
    expect(padString('hello', 10, '-', 'right')).toBe('hello-----');
  });

  it('pads string to the left', () => {
    expect(padString('hello', 10, '-', 'left')).toBe('-----hello');
  });

  it('uses space as default character', () => {
    expect(padString('hi', 5)).toBe('hi   ');
  });

  it('does not pad if string is longer', () => {
    expect(padString('hello world', 5)).toBe('hello world');
  });

  it('handles empty string', () => {
    expect(padString('', 3, 'x')).toBe('xxx');
  });

  it('handles pad char longer than 1', () => {
    expect(padString('hi', 6, 'ab')).toBe('hi abab');
  });
});
