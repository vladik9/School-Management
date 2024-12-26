import { romanNumerals } from "./dataEnums";
function arabicToRoman(num: number): string {
  if (num < 1 || num > 3999) return 'Number out of range! (1-3999)';
  let result = '';
  let remaining = num;

  for (const [value, symbol] of romanNumerals) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}
export { arabicToRoman };
