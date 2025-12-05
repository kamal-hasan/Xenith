export function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('factorial only defined for non-negative integers');
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export default factorial;
