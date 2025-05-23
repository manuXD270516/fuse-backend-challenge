export function isPriceWithin2Percent(current: number, offered: number): boolean {
  const tolerance = current * 0.02;
  return Math.abs(current - offered) <= tolerance;
}
