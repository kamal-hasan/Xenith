export function fibonacci(n: number): number[] {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('fibonacci only accepts non-negative integers');
  }
  if (n === 0) return [];
  if (n === 1) return [0];
  const result: number[] = [0, 1];
  while (result.length < n) {
    const len = result.length;
    result.push(result[len - 1] + result[len - 2]);
  }
  return result;
}

export default fibonacci;
