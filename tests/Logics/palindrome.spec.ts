import { test, expect } from '@playwright/test';
import { isPalindromeNumber } from '../../src/isPalindrome';

test.describe('isPalindromeNumber', () => {
  test('121 is palindrome', () => {
    expect(isPalindromeNumber(121)).toBe(true);
  });

  test('123 is not palindrome', () => {
    expect(isPalindromeNumber(123)).toBe(false);
  });

  test('single digit is palindrome', () => {
    expect(isPalindromeNumber(7)).toBe(true);
  });

  test('negative numbers are not palindrome', () => {
    expect(isPalindromeNumber(-121)).toBe(false);
  });

  test('large palindrome number', () => {
    expect(isPalindromeNumber(1234554321)).toBe(true);
  });

  test('non-integer throws', () => {
    expect(() => isPalindromeNumber(12.1 as unknown as number)).toThrow();
  });
});
