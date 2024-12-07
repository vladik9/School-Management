//Fix this function as now is not working well
function toRoman(num: number): string {
  const romanNumerals = ['Pregatitor', 'I', 'II', 'III', 'IV'];
  return romanNumerals[num - 1] || num.toString();
}
export { toRoman };
