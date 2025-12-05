export function maxInArray(arr: number[]): number {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('maxInArray requires a non-empty array');
  }
  return Math.max(...arr);
}

export function minInArray(arr: number[]): number {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('minInArray requires a non-empty array');
  }
  return Math.min(...arr);
}

export default { maxInArray, minInArray };

export function frequency<T>(arr: T[]): Record<string, number> {
  const freq: Record<string, number> = {};
  if (!Array.isArray(arr)) {
    throw new Error('frequency requires an array');
  }
  for (const el of arr) {
    const key = String(el);
    freq[key] = (freq[key] ?? 0) + 1;
  }
  return freq;
}

export function secondLargest(arr: number[]): number {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('secondLargest requires a non-empty array');
  }
  // Use a Set to consider distinct values only
  const unique = Array.from(new Set(arr));
  if (unique.length < 2) {
    throw new Error('array must contain at least two distinct values');
  }
  unique.sort((a, b) => b - a);
  return unique[1];
}
