import * as util from "../util"

describe('isInteger', () => {
    test('util.isInteger(2.5)', () => expect(util.isInteger(2.5)).toBe(false));
    test('util.isInteger(Number(2.5))', () => expect(util.isInteger(Number(2.5))).toBe(false));
    test('util.isInteger(2)', () => expect(util.isInteger(2)).toBe(true));
    test('util.isInteger("foo")', () => expect(util.isInteger("foo")).toBe(false));
    test('util.isInteger(true)', () => expect(util.isInteger(true)).toBe(false));
    test('util.isInteger(false)', () => expect(util.isInteger(false)).toBe(false));
    test('util.isInteger("2.5")', () => expect(util.isInteger("2.5")).toBe(false));
    test('util.isInteger("2.0")', () => expect(util.isInteger("2.0")).toBe(false));
    test('util.isInteger(Number(2))', () => expect(util.isInteger(Number(2))).toBe(true));
    test('util.isInteger(2 ** 234)', () => expect(util.isInteger(2 ** 234)).toBe(true));
    test('util.isInteger(0-(2 ** 234))', () => expect(util.isInteger(0 - (2 ** 234))).toBe(true));
    // 562949953421311 ((MAX_SAFE_INTEGER+1) / 16 - 1) is the last safe number where floats are reliable.
    test('util.isInteger(562949953421311)', () => expect(util.isInteger(562949953421311)).toBe(true));
    test('util.isInteger(562949953421311.1)', () => expect(util.isInteger(562949953421311.1)).toBe(false));
    test('util.isInteger(562949953421312.1)', () => expect(util.isInteger(562949953421312.1)).toBe(true));
    test('util.isInteger(Number.EPSILON)', () => expect(util.isInteger(Number.EPSILON)).toBe(false));
    test('util.isInteger(2 ** -(2 ** 10))', () => expect(util.isInteger(2 ** -(2 ** 10))).toBe(false));
    test('util.isInteger(2 ** -(2 ** 10))', () => expect(util.isInteger(2 ** -(2 ** 10))).toBe(false));
    test('util.isInteger(10 ** -323)', () => expect(util.isInteger(10 ** -323)).toBe(false));
});
