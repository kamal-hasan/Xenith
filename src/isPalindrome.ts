export function isPalindromeNumber(n: number): boolean {
  if (!Number.isInteger(n)) {
    throw new Error('isPalindromeNumber only accepts integers');
  }
  if (n < 0) return false;
  const s = String(n);
  return s === s.split('').reverse().join('');
}

export default isPalindromeNumber;
