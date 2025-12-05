import { test, expect } from '@playwright/test';
import { sumDigits } from '../../src/sumDigits';

test.describe('sumDigits', () => {
  test('0 -> 0', () => {
    expect(sumDigits(0)).toBe(0);
  });

  test('single digit', () => {
    expect(sumDigits(5)).toBe(5);
  });

  test('123 -> 6', () => {
    expect(sumDigits(123)).toBe(6);
  });

  test('1001 -> 2', () => {
    expect(sumDigits(1001)).toBe(2);
  });

  test('negative number handled using absolute value', () => {
    expect(sumDigits(-123)).toBe(6);
  });

  test('non-integer throws', () => {
    expect(() => sumDigits(12.34 as unknown as number)).toThrow();
  });
});
