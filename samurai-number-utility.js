/**
 * Utility functions for working with numbers in the Samurai game.
 *
 * This class currently exposes helpers like generating random integers within a range.
 * All methods are static and side-effect free.
 */
export class SamuraiNumberUtility {
    /**
     * Returns a random integer N such that fromInclusive <= N < toExclusive.
     *
     * - Non-integer bounds are coerced using Math.ceil(fromInclusive) and Math.floor(toExclusive)
     *   to respect the inclusive/exclusive semantics on integer values.
     * - Throws RangeError when the integer window is empty (i.e., floor(toExclusive) <= ceil(fromInclusive)).
     * - Throws TypeError when inputs are not finite numbers.
     *
     * @param {number} fromInclusive - The inclusive lower bound of the range.
     * @param {number} toExclusive - The exclusive upper bound of the range.
     * @returns {number} A uniformly distributed integer N with fromInclusive <= N < toExclusive (after integer coercion).
     * @throws {TypeError} If either bound is not a finite number.
     * @throws {RangeError} If the resulting integer range is empty (upper <= lower after ceil/floor).
     * @example
     * // returns one of 0,1,2,3
     * const n = SamuraiNumberUtility.getRandomInteger(0, 4);
     */
    getRandomInteger(fromInclusive, toExclusive) {
        if (!Number.isFinite(fromInclusive) || !Number.isFinite(toExclusive)) {
            throw new TypeError('fromInclusive and toExclusive must be finite numbers');
        }
        // Coerce to integers by ceiling/floor to respect inclusivity/exclusivity semantics
        const from = Math.ceil(fromInclusive);
        const to = Math.floor(toExclusive);
        if (to <= from) {
            throw new RangeError('Invalid range: toExclusive must be greater than fromInclusive when considering integer bounds');
        }
        const span = to - from; // positive integer
        // Use Math.random uniform [0,1) -> [0, span) -> integer offset [0, span-1]
        return from + Math.floor(Math.random() * span);
    }
};