import { test, expect } from '@playwright/test';
import { maxInArray, minInArray } from '../../src/arrayUtils';

test.describe('array utils', () => {
  test('max and min of normal array', () => {
    const arr = [3, 1, 4, 1, 5, 9];
    expect(maxInArray(arr)).toBe(9);
    expect(minInArray(arr)).toBe(1);
  });

  test('handles negative numbers', () => {
    const arr = [-10, -20, -3, -4];
    expect(maxInArray(arr)).toBe(-3);
    expect(minInArray(arr)).toBe(-20);
  });

  test('single element array', () => {
    const arr = [42];
    expect(maxInArray(arr)).toBe(42);
    expect(minInArray(arr)).toBe(42);
  });

  test('floats are supported', () => {
    const arr = [1.5, 2.25, -0.75];
    expect(maxInArray(arr)).toBeCloseTo(2.25);
    expect(minInArray(arr)).toBeCloseTo(-0.75);
  });

  test('empty array throws for max and min', () => {
    expect(() => maxInArray([])).toThrow();
    expect(() => minInArray([])).toThrow();
  });

  test('second largest element in normal array', () => {
    const arr = [3, 1, 4, 1, 5, 9];
    // distinct sorted desc: [9,5,4,3,1]
    const { secondLargest } = require('../src/arrayUtils');
    expect(secondLargest(arr)).toBe(5);
  });

  test('second largest with duplicates', () => {
    const arr = [2, 2, 3, 3, 1];
    const { secondLargest } = require('../src/arrayUtils');
    // distinct values [3,2,1] -> second is 2
    expect(secondLargest(arr)).toBe(2);
  });

  test('second largest throws for single distinct value', () => {
    const arr = [7, 7, 7];
    const { secondLargest } = require('../src/arrayUtils');
    expect(() => secondLargest(arr)).toThrow();
  });
});
