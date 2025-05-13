import { romanNumerals } from "./dataEnums";
import path from 'path';
/**
 * Converts an arabic numeral to a roman numeral.
 *
 * The input must be between 1 and 3999. If the input is outside of this range,
 * the function will return a string indicating the input is out of range.
 *
 * @param num The number to convert.
 * @returns The roman numeral representation of the input.
 */
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



function  stripTimestamp  (filename: string)  {
  // splits "foo_bar_1234567890.pdf" into ["foo_bar", "1234567890", ".pdf"]
  const parsed = path.parse(filename);
  // remove a trailing _<digits> from the name
  const cleanName = parsed.name.replace(/_(\d+)$/, '');
  return cleanName + parsed.ext;
};
export { arabicToRoman, stripTimestamp };
