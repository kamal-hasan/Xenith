export function reverseString(input: string): string {
  // Use Array.from to correctly handle Unicode code points (surrogate pairs, emoji).
  return Array.from(input).reverse().join('');
}

export default reverseString;
