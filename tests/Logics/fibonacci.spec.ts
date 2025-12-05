import { test, expect } from '@playwright/test';
import { fibonacci } from '../../src/fibonacci';

test.describe('fibonacci', () => {
  test('N = 0 returns empty array', () => {
    expect(fibonacci(0)).toEqual([]);
  });

  test('N = 1 returns [0]', () => {
    expect(fibonacci(1)).toEqual([0]);
  });

  test('N = 2 returns [0,1]', () => {
    expect(fibonacci(2)).toEqual([0, 1]);
  });

  test('N = 10 returns first 10 fibonacci numbers', () => {
    expect(fibonacci(10)).toEqual([0,1,1,2,3,5,8,13,21,34]);
  });

  test('negative input throws', () => {
    expect(() => fibonacci(-5)).toThrow();
  });
});
