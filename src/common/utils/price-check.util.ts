export function isPriceWithinPercentage(
  referencePrice: number,
  offeredPrice: number,
  tolerancePercent: number = 2,
): boolean {
  const tolerance = referencePrice * (tolerancePercent / 100);
  return Math.abs(referencePrice - offeredPrice) <= tolerance;
}
