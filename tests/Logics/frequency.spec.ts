import { test, expect } from '@playwright/test';
import { frequency } from '../../src/arrayUtils';

test.describe('frequency', () => {
  test('counts numbers correctly', () => {
    const arr = [1, 2, 2, 3, 1, 2];
    expect(frequency(arr)).toEqual({ '1': 2, '2': 3, '3': 1 });
  });

  test('counts strings correctly', () => {
    const arr = ['a', 'b', 'a', 'c', 'b'];
    expect(frequency(arr)).toEqual({ a: 2, b: 2, c: 1 });
  });

  test('empty array returns empty object', () => {
    expect(frequency([])).toEqual({});
  });

  test('mixed types are stringified as keys', () => {
    const arr = [1, '1', true, true, false];
    expect(frequency(arr)).toEqual({ '1': 2, 'true': 2, 'false': 1 });
  });
});
