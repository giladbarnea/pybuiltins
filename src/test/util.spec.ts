import * as util from "../util"

describe('isFloat', () => {
    test('util.isFloat(2.5)', () => expect(util.isFloat(2.5)).toBe(true));
    test('util.isFloat(2)', () => expect(util.isFloat(2)).toBe(false));
    test('util.isFloat("foo")', () => expect(util.isFloat("foo")).toBe(false));
    test('util.isFloat(true)', () => expect(util.isFloat(true)).toBe(false));
    test('util.isFloat(false)', () => expect(util.isFloat(false)).toBe(false));
    test('util.isFloat("2.5")', () => expect(util.isFloat("2.5")).toBe(false));
    test('util.isFloat("2.0")', () => expect(util.isFloat("2.0")).toBe(false));
    test('util.isFloat(Number(2.5))', () => expect(util.isFloat(Number(2.5))).toBe(true));
    test('util.isFloat(Number(2))', () => expect(util.isFloat(Number(2))).toBe(false));
});
