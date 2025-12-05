import { test, expect } from '@playwright/test';
import { binaryToDecimal } from '../../src/binaryToDecimal';

test.describe('binaryToDecimal', () => {
  test('"101" -> 5', () => {
    expect(binaryToDecimal('101')).toBe(5);
  });

  test('"0" -> 0', () => {
    expect(binaryToDecimal('0')).toBe(0);
  });

  test('leading zeros "0010" -> 2', () => {
    expect(binaryToDecimal('0010')).toBe(2);
  });

  test('long binary "1111" -> 15', () => {
    expect(binaryToDecimal('1111')).toBe(15);
  });

  test('negative binary "-101" -> -5', () => {
    expect(binaryToDecimal('-101')).toBe(-5);
  });

  test('invalid characters throw', () => {
    expect(() => binaryToDecimal('102')).toThrow();
    expect(() => binaryToDecimal('abc')).toThrow();
    expect(() => binaryToDecimal('')).toThrow();
  });
});
