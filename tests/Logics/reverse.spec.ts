import { test, expect } from '@playwright/test';
import { reverseString } from '../../src/reverseString';

test.describe('reverseString', () => {
  test('reverses a simple word', () => {
    expect(reverseString('hello')).toBe('olleh');
  });

  test('handles empty string', () => {
    expect(reverseString('')).toBe('');
  });

  test('handles single character', () => {
    expect(reverseString('a')).toBe('a');
  });

  test('handles emoji and surrogate pairs', () => {
    expect(reverseString('🙂🚀')).toBe('🚀🙂');
  });

  test('palindrome remains the same when reversed', () => {
    expect(reverseString('madam')).toBe('madam');
  });
});
