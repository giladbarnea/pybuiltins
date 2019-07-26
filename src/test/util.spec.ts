import * as util from "../util"

describe('isRoundNumber', () => {
    test('util.isRoundNumber(2.5)', () => expect(util.isRoundNumber(2.5)).toBe(false));
    test('util.isRoundNumber(Number(2.5))', () => expect(util.isRoundNumber(Number(2.5))).toBe(false));
    test('util.isRoundNumber(2)', () => expect(util.isRoundNumber(2)).toBe(true));
    test('util.isRoundNumber("foo")', () => expect(util.isRoundNumber("foo")).toBe(false));
    test('util.isRoundNumber(true)', () => expect(util.isRoundNumber(true)).toBe(false));
    test('util.isRoundNumber(false)', () => expect(util.isRoundNumber(false)).toBe(false));
    test('util.isRoundNumber("2.5")', () => expect(util.isRoundNumber("2.5")).toBe(false));
    test('util.isRoundNumber("2.0")', () => expect(util.isRoundNumber("2.0")).toBe(false));
    test('util.isRoundNumber(Number(2))', () => expect(util.isRoundNumber(Number(2))).toBe(true));
    test('util.isRoundNumber(2 ** 234)', () => expect(util.isRoundNumber(2 ** 234)).toBe(true));
    test('util.isRoundNumber(0-(2 ** 234))', () => expect(util.isRoundNumber(0 - (2 ** 234))).toBe(true));
});
