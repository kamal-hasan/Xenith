export function binaryToDecimal(bin: string): number {
  if (typeof bin !== 'string') {
    throw new Error('binaryToDecimal expects a string input');
  }
  if (bin.length === 0) {
    throw new Error('empty string is not a valid binary');
  }
  let sign = 1;
  let s = bin;
  if (s.startsWith('-')) {
    sign = -1;
    s = s.slice(1);
  }
  if (!/^[01]+$/.test(s)) {
    throw new Error('invalid binary string');
  }
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    result = result * 2 + (s.charCodeAt(i) - 48);
  }
  return sign * result;
}

export default binaryToDecimal;
