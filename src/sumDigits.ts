export function sumDigits(n: number): number {
  if (!Number.isInteger(n)) {
    throw new Error('sumDigits only accepts integers');
  }
  const s = String(Math.abs(n));
  if (s === '0') return 0;
  return s.split('').reduce((acc, ch) => acc + Number(ch), 0);
}

export default sumDigits;
