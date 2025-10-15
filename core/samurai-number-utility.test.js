import {SamuraiNumberUtility} from './samurai-number-utility.js';

// Helper to run many trials to statistically assert boundaries
function sampleMany(fn, trials = 5000) {
  const values = new Set();
  for (let i = 0; i < trials; i++) {
    values.add(fn());
  }
  return values;
}

describe('SamuraiNumberUtility.getRandomInteger', () => {
  test('throws on non-finite inputs', () => {
    expect(() => SamuraiNumberUtility.getRandomInteger(NaN, 5)).toThrow(TypeError);
    expect(() => SamuraiNumberUtility.getRandomInteger(0, Infinity)).toThrow(TypeError);
    expect(() => SamuraiNumberUtility.getRandomInteger(-Infinity, 1)).toThrow(TypeError);
  });

  test('throws when integer window is empty (to <= from after ceil/floor)', () => {
    expect(() => SamuraiNumberUtility.getRandomInteger(3, 3)).toThrow(RangeError);
    expect(() => SamuraiNumberUtility.getRandomInteger(3.1, 3.9)).toThrow(RangeError); // ceil(3.1)=4, floor(3.9)=3
    expect(() => SamuraiNumberUtility.getRandomInteger(5, 4)).toThrow(RangeError);
  });

  test('respects fromInclusive and toExclusive on integer boundaries', () => {
    const from = 0; const to = 4;
    const values = sampleMany(() => SamuraiNumberUtility.getRandomInteger(from, to));
    // Should include 0,1,2,3 and exclude 4 and negatives
    expect(values.has(-1)).toBe(false);
    expect(values.has(4)).toBe(false);
    expect(values.has(0)).toBe(true);
    expect(values.has(1)).toBe(true);
    expect(values.has(2)).toBe(true);
    expect(values.has(3)).toBe(true);
  });

  test('works with non-integer bounds using ceil/floor semantics', () => {
    const values = sampleMany(() => SamuraiNumberUtility.getRandomInteger(1.2, 4.8));
    // ceil(1.2)=2, floor(4.8)=4 => possible: 2,3
    expect(values.has(1)).toBe(false);
    expect(values.has(2)).toBe(true);
    expect(values.has(3)).toBe(true);
    expect(values.has(4)).toBe(false);
  });

  test('handles negative ranges', () => {
    const values = sampleMany(() => SamuraiNumberUtility.getRandomInteger(-3, 2));
    // possible: -3,-2,-1,0,1
    expect(values.has(-4)).toBe(false);
    expect(values.has(2)).toBe(false);
    for (const v of [-3,-2,-1,0,1]) {
      expect(values.has(v)).toBe(true);
    }
  });
});
