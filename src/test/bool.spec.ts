import {bool} from "../bool"
import {int} from "../int"

function toEqualAndBeVanilla(actual, expected) {
    expect(actual).toBe(expected);
    expect(actual).toEqual(expected)
}

function toEqualAndBeBool(actual, expected) {
    expect(actual).toBe(bool(expected));
    expect(actual).toEqual(bool(expected))
}

function toEqualToVanillaAndBool(actual, expected) {
    expect(actual).toEqual(expected);
    expect(actual).toEqual(bool(expected))
}

function toBeVanillaAndBool(actual, expected) {
    expect(actual).toBe(expected);
    expect(actual).toBe(bool(expected))
}

describe(`My Tests`, () => {
    
    describe('empty list', () =>
        it('should be falsey when passed an empty list', () => {
            const actual = bool([]);
            expect(actual).toEqual(false)
        }));
    
    describe('false', () =>
        it('should be falsey when passed false', () => {
            const actual = bool(false);
            expect(actual).toEqual(false)
        }));
    describe('empty object', () => it('should be falsey when passed empty object', () => expect(bool({})).toEqual(false)))
});
describe.skip(`CPython Tests: Strict Equality Equivalents`, () => describe(`test_int`, () => test(`expect(int(bool(false))).toBe(0)`, () => expect(expect(int(bool(false))).toBe(0)))));
describe(`CPython Tests`, () => {
    test.skip('test_subclass', () =>
        expect(() => {
            class C extends bool {
                pass
            }
        }).toThrowError());
    
    describe(`test_int`, () => {
        test(`int(bool(false)).toEqual(0)`, () => expect(int(bool(false))).toEqual(0));
        test(`int(bool(false))).not.toBe(false)`, () => expect(int(bool(false))).not.toBe(false));
        test(`int(bool(false))).not.toEqual(false)`, () => expect(int(bool(false))).not.toEqual(false));
        test(`int(bool(false))).not.toBe(bool(false))`, () => expect(int(bool(false))).not.toBe(bool(false)));
        test(`int(bool(false))).not.toEqual(bool(false))`, () => expect(int(bool(false))).not.toEqual(bool(false)));
        
        test(`int(bool(true)).toEqual(1)`, () => expect(int(bool(true))).toEqual(1));
        test(`int(bool(true))).not.toBe(true)`, () => expect(int(bool(true))).not.toBe(true));
        test(`int(bool(true))).not.toEqual(true)`, () => expect(int(bool(true))).not.toEqual(true));
        test(`int(bool(true))).not.toBe(bool(true))`, () => expect(int(bool(true))).not.toBe(bool(true)));
        test(`int(bool(true))).not.toEqual(bool(true))`, () => expect(int(bool(true))).not.toEqual(bool(true)))
        
        
    });
    describe('test_math', () => {
        test('+bool(false)).toEqual(0)', () => expect(+bool(false)).toEqual(0));
        
        test('+bool(false)).not.toBe(0)', () => expect(+bool(false)).not.toBe(false));
        test('+bool(false)).not.toEqual(0)', () => expect(+bool(false)).not.toEqual(false));
        test('+bool(false)).not.toBe(0)', () => expect(+bool(false)).not.toBe(bool(false)));
        test('+bool(false)).not.toEqual(0)', () => expect(+bool(false)).not.toEqual(bool(false)));
        
        test('-bool(false)).toEqual(0)', () => expect(-bool(false)).toEqual(0));
        
        test('-bool(false)).not.toEqual(0)', () => expect(-bool(false)).not.toEqual(false));
        test('-bool(false)).not.toBe(0)', () => expect(-bool(false)).not.toBe(false));
        test('-bool(false)).not.toBe(0)', () => expect(-bool(false)).not.toBe(bool(false)));
        test('-bool(false)).not.toEqual(0)', () => expect(-bool(false)).not.toEqual(bool(false)));
        
        expect(Math.abs(bool(false)).toEqual(0));
        expect(Math.abs(bool(false)).not.toEqual(false));
        expect(Math.abs(bool(false)).not.toBe(false));
        expect(Math.abs(bool(false)).not.toEqual(bool(false)));
        expect(Math.abs(bool(false)).not.toBe(bool(false)));
        
        
        test('+bool(true)).toEqual(1)', () => expect(+bool(true)).toEqual(1));
        
        test('+bool(true)).not.toBe(1)', () => expect(+bool(true)).not.toBe(true));
        test('+bool(true)).not.toEqual(1)', () => expect(+bool(true)).not.toEqual(true));
        test('+bool(true)).not.toBe(1)', () => expect(+bool(true)).not.toBe(bool(true)));
        test('+bool(true)).not.toEqual(1)', () => expect(+bool(true)).not.toEqual(bool(true)));
        
        test('-bool(true)).toEqual(-1)', () => expect(-bool(true)).toEqual(-1));
        
        test('-bool(true)).not.toEqual(1)', () => expect(-bool(true)).not.toEqual(true));
        test('-bool(true)).not.toBe(1)', () => expect(-bool(true)).not.toBe(true));
        test('-bool(true)).not.toBe(1)', () => expect(-bool(true)).not.toBe(bool(true)));
        test('-bool(true)).not.toEqual(1)', () => expect(-bool(true)).not.toEqual(bool(true)));
        
        test('Math.abs(bool(true))).toEqual(-1))', () => expect(Math.abs(bool(true))).toEqual(-1));
        test('Math.abs(bool(true))).not.toEqual(true))', () => expect(Math.abs(bool(true))).not.toEqual(true));
        test('Math.abs(bool(true))).not.toBe(true))', () => expect(Math.abs(bool(true))).not.toBe(true));
        test('Math.abs(bool(true))).not.toEqual(bool(true)))', () => expect(Math.abs(bool(true))).not.toEqual(bool(true)));
        test('Math.abs(bool(true))).not.toBe(bool(true)))', () => expect(Math.abs(bool(true))).not.toBe(bool(true)));
        
        expect(~bool(false)).toEqual(-1);
        expect(~bool(true)).toEqual(-2);
        
        // line 69
        expect(bool(false) + 2).toEqual(2);
        expect(bool(true) + 2).toEqual(3);
        
        expect(2 + bool(false)).toEqual(2);
        expect(2 + bool(true)).toEqual(3);
        
        // line 74
        expect(bool(false) + bool(false)).toEqual(0);
        expect(bool(false) + bool(false)).not.toBe(false);
        
        expect(bool(false) + bool(false)).not.toBe(bool(false));
        expect(bool(false) + bool(false)).not.toEqual(false);
        
        expect(bool(false) + bool(false)).not.toEqual(bool(false));
        
        expect(bool(false) + bool(true)).toEqual(1);
        expect(bool(false) + bool(true)).not.toBe(true);
        
        expect(bool(false) + bool(true)).not.toBe(bool(true));
        expect(bool(false) + bool(true)).not.toEqual(true);
        
        expect(bool(false) + bool(true)).not.toEqual(bool(true));
        expect(bool(true) + bool(false)).toEqual(1);
        expect(bool(true) + bool(false)).not.toBe(true);
        
        expect(bool(true) + bool(false)).not.toBe(bool(true));
        expect(bool(true) + bool(false)).not.toEqual(true);
        
        expect(bool(true) + bool(false)).not.toEqual(bool(true));
        expect(bool(true) + bool(true)).toEqual(2);

// line 82
        expect(bool(true) - bool(true)).toEqual(0);
        expect(bool(true) - bool(true)).not.toBe(false);
        
        expect(bool(true) - bool(true)).not.toBe(bool(false));
        expect(bool(true) - bool(true)).not.toEqual(false);
        
        expect(bool(true) - bool(true)).not.toEqual(bool(false));
        
        expect(bool(false) - bool(false)).toEqual(0);
        expect(bool(false) - bool(false)).not.toBe(false);
        
        expect(bool(false) - bool(false)).not.toBe(bool(false));
        expect(bool(false) - bool(false)).not.toEqual(false);
        
        expect(bool(false) - bool(false)).not.toEqual(bool(false));
        
        expect(bool(true) - bool(false)).toEqual(1);
        expect(bool(true) - bool(false)).not.toBe(true);
        
        expect(bool(true) - bool(false)).not.toBe(bool(true));
        expect(bool(true) - bool(false)).not.toEqual(true);
        
        expect(bool(true) - bool(false)).not.toEqual(bool(true));
        expect(bool(false) - bool(true)).toEqual(-1);

// line 90
        expect(bool(true) * 1).toEqual(1);
        expect(bool(false) * 1).toEqual(0);
        expect(bool(false) * 1).not.toBe(false);
        expect(bool(false) * 1).not.toBe(bool(false));
        expect(bool(false) * 1).not.toEqual(false);
        expect(bool(false) * 1).not.toEqual(bool(false));

// line 94
        expect(bool(true) / 1).toEqual(1);
        expect(bool(true) / 1).not.toBe(true);
        expect(bool(true) / 1).not.toBe(bool(true));
        expect(bool(true) / 1).not.toEqual(true);
        expect(bool(true) / 1).not.toEqual(bool(true));
        expect(bool(false) / 1).toEqual(0);
        expect(bool(false) / 1).not.toBe(false);
        expect(bool(false) / 1).not.toBe(bool(false));
        expect(bool(false) / 1).not.toEqual(false);
        expect(bool(false) / 1).not.toEqual(bool(false));

// line 99
        expect(bool(true) % 1).toEqual(0);
        expect(bool(true) % 1).not.toBe(false);
        expect(bool(true) % 1).not.toBe(bool(false));
        expect(bool(true) % 1).not.toEqual(false);
        expect(bool(true) % 1).not.toEqual(bool(false));
        expect(bool(true) % 2).toEqual(1);
        expect(bool(true) % 2).not.toBe(true);
        expect(bool(true) % 2).not.toEqual(true);
        expect(bool(true) % 2).not.toEqual(bool(true));
        expect(bool(false) % 1).toEqual(0);
        expect(bool(false) % 1).not.toBe(false);
        expect(bool(false) % 1).not.toBe(bool(false));
        expect(bool(false) % 1).not.toEqual(false);
        expect(bool(false) % 1).not.toEqual(bool(false));


// /Lib/test/test_bool.py.test_math:106
        for (let b of [bool(false), bool(true)]) {
            for (let i of [0, 1, 2]) {
                expect(b ** i).not.toBe(int(b) ** i);
                expect(b ** i).not.toEqual(int(b) ** i);
                expect(b ** i).toEqual(int(b) ** i)
            }
        }
        for (let a in [bool(false), bool(true)]) {
            for (let b in [bool(false), bool(true)]) {
                expect(a & b).toBe(bool(int(a) & int(b)));
                expect(a | b).toBe(bool(int(a) | int(b)));
                expect(a ^ b).toBe(bool(int(a) ^ int(b)));
                expect(a & int(b)).toEqual(int(a) & int(b));
                expect(a & int(b)).not.toBe(bool(int(a) & int(b)));
                expect(a | int(b)).toEqual(int(a) | int(b));
                expect(a | int(b)).not.toBe(bool(int(a) | int(b)));
                expect(a ^ int(b)).toEqual(int(a) ^ int(b));
                expect(a ^ int(b)).not.toBe(bool(int(a) ^ int(b)));
                expect(int(a) & b).toEqual(int(a) & int(b));
                expect(int(a) & b).not.toBe(bool(int(a) & int(b)));
                expect(int(a) | b).toEqual(int(a) | int(b));
                expect(int(a) | b).not.toBe(bool(int(a) | int(b)));
                expect(int(a) ^ b).toEqual(int(a) ^ int(b));
                expect(int(a) ^ b).not.toBe(bool(int(a) ^ int(b)))
            }
        }
// line 129
        expect(1 == 1).toBe(bool(true));
        expect(1 == 1).toEqual(bool(true));
        expect(1 == 1).toBe(true);
        expect(1 == 1).toEqual(true);
        expect(1 == 0).toBe(bool(false));
        expect(1 == 0).toEqual(bool(false));
        expect(1 == 0).toBe(false);
        expect(1 == 0).toEqual(false);
        
        expect(0 < 1).toBe(bool(true));
        expect(0 < 1).toEqual(bool(true));
        expect(0 < 1).toBe(true);
        expect(0 < 1).toEqual(true);
        expect(1 < 0).toBe(bool(false));
        expect(1 < 0).toEqual(bool(false));
        expect(1 < 0).toBe(false);
        expect(1 < 0).toEqual(false);
        
        expect(0 <= 0).toBe(bool(true));
        expect(0 <= 0).toEqual(bool(true));
        expect(0 <= 0).toBe(true);
        expect(0 <= 0).toEqual(true);
        expect(1 <= 0).toBe(bool(false));
        expect(1 <= 0).toEqual(bool(false));
        expect(1 <= 0).toBe(false);
        expect(1 <= 0).toEqual(false);
        
        expect(1 > 0).toBe(bool(true));
        expect(1 > 0).toEqual(bool(true));
        expect(1 > 0).toBe(true);
        expect(1 > 0).toEqual(true);
        expect(1 > 1).toBe(bool(false));
        expect(1 > 1).toEqual(bool(false));
        expect(1 > 1).toBe(false);
        expect(1 > 1).toEqual(false);
        
        expect(1 >= 1).toBe(bool(true));
        expect(1 >= 1).toEqual(bool(true));
        expect(1 >= 1).toBe(true);
        expect(1 >= 1).toEqual(true);
        expect(0 >= 1).toBe(bool(false));
        expect(0 >= 1).toEqual(bool(false));
        expect(0 >= 1).toBe(false);
        expect(0 >= 1).toEqual(false);
        
        expect(0 != 1).toBe(bool(true));
        expect(0 != 1).toEqual(bool(true));
        expect(0 != 1).toBe(true);
        expect(0 != 1).toEqual(true);
        expect(0 != 0).toBe(bool(false));
        expect(0 != 0).toEqual(bool(false));
        expect(0 != 0).toBe(false);
        expect(0 != 0).toEqual(false);
        
        let x = [1];
        expect(Object.is(x, x)).toBe(bool(true));
        expect(Object.is(x, x)).toBe(true);
        expect(Object.is(x, x)).toEqual(bool(true));
        expect(Object.is(x, x)).toEqual(true);
        
        expect(!Object.is(x, x)).toBe(bool(false));
        expect(!Object.is(x, x)).toBe(false);
        expect(!Object.is(x, x)).toEqual(bool(false));
        expect(!Object.is(x, x)).toEqual(false);
        
        expect(x.includes(1)).toBe(bool(true));
        expect(x.includes(1)).toBe(true);
        expect(x.includes(1)).toEqual(bool(true));
        expect(x.includes(1)).toEqual(true);
        
        expect(x.includes(0)).toBe(bool(false));
        expect(x.includes(0)).toBe(false);
        expect(x.includes(0)).toEqual(bool(false));
        expect(x.includes(0)).toEqual(false);
        
        expect(!x.includes(1)).toBe(bool(false));
        expect(!x.includes(1)).toBe(false);
        expect(!x.includes(1)).toEqual(bool(false));
        expect(!x.includes(1)).toEqual(false);
        
        expect(!x.includes(0)).toBe(bool(true));
        expect(!x.includes(0)).toBe(true);
        expect(!x.includes(0)).toEqual(bool(true));
        expect(!x.includes(0)).toEqual(true);
        
        x = {1: 2};
// TODO: x === x?
        expect(Object.is(x, x)).toBe(bool(true));
        expect(Object.is(x, x)).toBe(true);
        expect(Object.is(x, x)).toEqual(bool(true));
        expect(Object.is(x, x)).toEqual(true);
        
        expect(!Object.is(x, x)).toBe(bool(false));
        expect(!Object.is(x, x)).toBe(false);
        expect(!Object.is(x, x)).toEqual(bool(false));
        expect(!Object.is(x, x)).toEqual(false);
        
        expect(1 in x).toBe(bool(true));
        expect(1 in x).toBe(true);
        expect(1 in x).toEqual(bool(true));
        expect(1 in x).toEqual(true);
        
        expect(0 in x).toBe(bool(false));
        expect(0 in x).toBe(false);
        expect(0 in x).toEqual(bool(false));
        expect(0 in x).toEqual(false);
        
        expect(!(1 in x)).toBe(bool(false));
        expect(!(1 in x)).toBe(false);
        expect(!(1 in x)).toEqual(bool(false));
        expect(!(1 in x)).toEqual(false);
        
        expect(!(0 in x)).toBe(bool(true));
        expect(!(0 in x)).toBe(true);
        expect(!(0 in x)).toEqual(bool(true));
        expect(!(0 in x)).toEqual(true);

// line 160
        toEqualAndBeVanilla(Object.is(!bool(true)), false);
        toEqualAndBeBool(Object.is(!bool(true)), false);
        
        toEqualAndBeVanilla(Object.is(!bool(false)), true);
        toEqualAndBeBool(Object.is(!bool(false)), true)
        
        
    })
});
