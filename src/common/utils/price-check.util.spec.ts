import { isPriceWithinPercentage } from './price-check.util';

describe('isPriceWithinPercentage', () => {
  it('returns true if offered price is within 2% range', () => {
    expect(isPriceWithinPercentage(100, 101.9)).toBe(true);
    expect(isPriceWithinPercentage(100, 98.1)).toBe(true);
  });

  it('returns false if offered price is outside 2% range', () => {
    expect(isPriceWithinPercentage(100, 102.5)).toBe(false);
    expect(isPriceWithinPercentage(100, 95)).toBe(false);
  });
});
