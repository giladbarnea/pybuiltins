import {bool} from "../bool"
import {int} from "../int"

function toEqualAndBeVanilla(actual, expected) {
    test(`expect(${actual}).toBe(${expected})`, () => expect(actual).toBe(expected));
    test(`expect(${actual}).toEqual(${expected})`, () => expect(actual).toEqual(expected))
}

function toEqualAndBeBool(actual, expected) {
    test(`expect(${actual}).toBe(bool(${expected}) = ${bool(expected)})`, () => expect(actual).toBe(bool(expected)));
    test(`expect(${actual}).toEqual(bool(${expected}) = ${bool(expected)})`, () => expect(actual).toEqual(bool(expected)))
}

function toEqualAndBeVanillaAndBool(actual, expected, pytest = undefined) {
    if (pytest) {
        describe(pytest, () => {
            
            toEqualAndBeVanilla(actual, expected);
            toEqualAndBeBool(actual, expected);
        });
    } else {
        toEqualAndBeVanilla(actual, expected);
        toEqualAndBeBool(actual, expected);
    }
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
        
        // line 57
        test('-bool(false)).toEqual(0)', () => expect(-bool(false)).toEqual(0));
        
        test('-bool(false)).not.toEqual(0)', () => expect(-bool(false)).not.toEqual(false));
        test('-bool(false)).not.toBe(0)', () => expect(-bool(false)).not.toBe(false));
        test('-bool(false)).not.toBe(0)', () => expect(-bool(false)).not.toBe(bool(false)));
        test('-bool(false)).not.toEqual(0)', () => expect(-bool(false)).not.toEqual(bool(false)));
        
        test('(Math.abs(bool(false)).toEqual(0))', () => expect(Math.abs(bool(false))).toEqual(0));
        test('Math.abs(bool(false)).not.toEqual(false)', () => expect(Math.abs(bool(false))).not.toEqual(false));
        test('Math.abs(bool(false)).not.toBe(false)', () => expect(Math.abs(bool(false))).not.toBe(false));
        test('Math.abs(bool(false)).not.toEqual(bool(false))', () => expect(Math.abs(bool(false))).not.toEqual(bool(false)));
        test('Math.abs(bool(false)).not.toBe(bool(false))', () => expect(Math.abs(bool(false))).not.toBe(bool(false)));
        
        
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
        
        test('~bool(false).toEqual(-1)', () => expect(~bool(false)).toEqual(-1));
        test('~bool(true).toEqual(-2)', () => expect(~bool(true)).toEqual(-2));
        
        // line 69
        test('(bool(false) + 2).toEqual(2)', () => expect(bool(false) + 2).toEqual(2));
        test('(bool(true) + 2) .toEqual(3)', () => expect(bool(true) + 2).toEqual(3));
        
        test('(2 + bool(false)).toEqual(2)', () => expect(2 + bool(false)).toEqual(2));
        test('(2 + bool(true)) .toEqual(3)', () => expect(2 + bool(true)).toEqual(3));
        
        // line 74
        test('bool(false) + bool(false)).toEqual(0)', () => expect(bool(false) + bool(false)).toEqual(0));
        test('bool(false) + bool(false)).not.toBe(false)', () => expect(bool(false) + bool(false)).not.toBe(false));
        
        test('bool(false) + bool(false)).not.toBe(bool(false))', () => expect(bool(false) + bool(false)).not.toBe(bool(false)));
        test('bool(false) + bool(false)).not.toEqual(false)', () => expect(bool(false) + bool(false)).not.toEqual(false));
        
        test('bool(false) + bool(false)).not.toEqual(bool(false))', () => expect(bool(false) + bool(false)).not.toEqual(bool(false)));
        
        test('bool(false) + bool(true)) .toEqual(1)', () => expect(bool(false) + bool(true)).toEqual(1));
        test('bool(false) + bool(true)) .not.toBe(true)', () => expect(bool(false) + bool(true)).not.toBe(true));
        
        test('bool(false) + bool(true)) .not.toBe(bool(true))', () => expect(bool(false) + bool(true)).not.toBe(bool(true)));
        test('bool(false) + bool(true)) .not.toEqual(true)', () => expect(bool(false) + bool(true)).not.toEqual(true));
        
        test('bool(false) + bool(true)) .not.toEqual(bool(true))', () => expect(bool(false) + bool(true)).not.toEqual(bool(true)));
        test('bool(true) + bool(false)) .toEqual(1)', () => expect(bool(true) + bool(false)).toEqual(1));
        test('bool(true) + bool(false)) .not.toBe(true)', () => expect(bool(true) + bool(false)).not.toBe(true));
        
        test('bool(true) + bool(false)) .not.toBe(bool(true))', () => expect(bool(true) + bool(false)).not.toBe(bool(true)));
        test('bool(true) + bool(false)) .not.toEqual(true)', () => expect(bool(true) + bool(false)).not.toEqual(true));
        
        test('bool(true) + bool(false)) .not.toEqual(bool(true))', () => expect(bool(true) + bool(false)).not.toEqual(bool(true)));
        test('bool(true) + bool(true))  .toEqual(2)', () => expect(bool(true) + bool(true)).toEqual(2));
        
        // line 82
        test('expect(bool(true) - bool(true)).toEqual(0)', () => expect(bool(true) - bool(true)).toEqual(0));
        test('expect(bool(true) - bool(true)).not.toBe(false)', () => expect(bool(true) - bool(true)).not.toBe(false));
        
        test('expect(bool(true) - bool(true)).not.toBe(bool(false))', () => expect(bool(true) - bool(true)).not.toBe(bool(false)));
        test('expect(bool(true) - bool(true)).not.toEqual(false)', () => expect(bool(true) - bool(true)).not.toEqual(false));
        
        test('expect(bool(true) - bool(true)).not.toEqual(bool(false))', () => expect(bool(true) - bool(true)).not.toEqual(bool(false)));
        
        test('expect(bool(false) - bool(false)).toEqual(0)', () => expect(bool(false) - bool(false)).toEqual(0));
        test('expect(bool(false) - bool(false)).not.toBe(false)', () => expect(bool(false) - bool(false)).not.toBe(false));
        
        test('expect(bool(false) - bool(false)).not.toBe(bool(false))', () => expect(bool(false) - bool(false)).not.toBe(bool(false)));
        test('expect(bool(false) - bool(false)).not.toEqual(false)', () => expect(bool(false) - bool(false)).not.toEqual(false));
        
        test('expect(bool(false) - bool(false)).not.toEqual(bool(false))', () => expect(bool(false) - bool(false)).not.toEqual(bool(false)));
        
        test('expect(bool(true) - bool(false)).toEqual(1)', () => expect(bool(true) - bool(false)).toEqual(1));
        test('expect(bool(true) - bool(false)).not.toBe(true)', () => expect(bool(true) - bool(false)).not.toBe(true));
        
        test('expect(bool(true) - bool(false)).not.toBe(bool(true))', () => expect(bool(true) - bool(false)).not.toBe(bool(true)));
        test('expect(bool(true) - bool(false)).not.toEqual(true)', () => expect(bool(true) - bool(false)).not.toEqual(true));
        
        test('expect(bool(true) - bool(false)).not.toEqual(bool(true))', () => expect(bool(true) - bool(false)).not.toEqual(bool(true)));
        test('expect(bool(false) - bool(true)).toEqual(-1)', () => expect(bool(false) - bool(true)).toEqual(-1));
        
        // line 90
        test('expect(bool(true) * 1).toEqual(1)', () => expect(bool(true) * 1).toEqual(1));
        test('expect(bool(false) * 1).toEqual(0)', () => expect(bool(false) * 1).toEqual(0));
        test('expect(bool(false) * 1).not.toBe(false)', () => expect(bool(false) * 1).not.toBe(false));
        test('expect(bool(false) * 1).not.toBe(bool(false))', () => expect(bool(false) * 1).not.toBe(bool(false)));
        test('expect(bool(false) * 1).not.toEqual(false)', () => expect(bool(false) * 1).not.toEqual(false));
        test('expect(bool(false) * 1).not.toEqual(bool(false))', () => expect(bool(false) * 1).not.toEqual(bool(false)));
        
        // line 94
        test('expect(bool(true) / 1).toEqual(1)', () => expect(bool(true) / 1).toEqual(1));
        test('expect(bool(true) / 1).not.toBe(true)', () => expect(bool(true) / 1).not.toBe(true));
        test('expect(bool(true) / 1).not.toBe(bool(true))', () => expect(bool(true) / 1).not.toBe(bool(true)));
        test('expect(bool(true) / 1).not.toEqual(true)', () => expect(bool(true) / 1).not.toEqual(true));
        test('expect(bool(true) / 1).not.toEqual(bool(true))', () => expect(bool(true) / 1).not.toEqual(bool(true)));
        test('expect(bool(false) / 1).toEqual(0)', () => expect(bool(false) / 1).toEqual(0));
        test('expect(bool(false) / 1).not.toBe(false)', () => expect(bool(false) / 1).not.toBe(false));
        test('expect(bool(false) / 1).not.toBe(bool(false))', () => expect(bool(false) / 1).not.toBe(bool(false)));
        test('expect(bool(false) / 1).not.toEqual(false)', () => expect(bool(false) / 1).not.toEqual(false));
        test('expect(bool(false) / 1).not.toEqual(bool(false))', () => expect(bool(false) / 1).not.toEqual(bool(false)));
        
        // line 99
        test('expect(bool(true) % 1).toEqual(0)', () => expect(bool(true) % 1).toEqual(0));
        test('expect(bool(true) % 1).not.toBe(false)', () => expect(bool(true) % 1).not.toBe(false));
        test('expect(bool(true) % 1).not.toBe(bool(false))', () => expect(bool(true) % 1).not.toBe(bool(false)));
        test('expect(bool(true) % 1).not.toEqual(false)', () => expect(bool(true) % 1).not.toEqual(false));
        test('expect(bool(true) % 1).not.toEqual(bool(false))', () => expect(bool(true) % 1).not.toEqual(bool(false)));
        test('expect(bool(true) % 2).toEqual(1)', () => expect(bool(true) % 2).toEqual(1));
        test('expect(bool(true) % 2).not.toBe(true)', () => expect(bool(true) % 2).not.toBe(true));
        test('expect(bool(true) % 2).not.toEqual(true)', () => expect(bool(true) % 2).not.toEqual(true));
        test('expect(bool(true) % 2).not.toEqual(bool(true))', () => expect(bool(true) % 2).not.toEqual(bool(true)));
        test('expect(bool(false) % 1).toEqual(0)', () => expect(bool(false) % 1).toEqual(0));
        test('expect(bool(false) % 1).not.toBe(false)', () => expect(bool(false) % 1).not.toBe(false));
        test('expect(bool(false) % 1).not.toBe(bool(false))', () => expect(bool(false) % 1).not.toBe(bool(false)));
        test('expect(bool(false) % 1).not.toEqual(false)', () => expect(bool(false) % 1).not.toEqual(false));
        test('expect(bool(false) % 1).not.toEqual(bool(false))', () => expect(bool(false) % 1).not.toEqual(bool(false)));
        
        
        // /Lib/test/test_bool.py.test_math:106
        for (let b of [bool(false), bool(true)]) {
            for (let i of [0, 1, 2]) {
                let expected = int(b) ** i;
                let actual = b ** i;
                test(`expect(${b}**${i} = ${actual}).not.toBe(int(${b}) ** ${i} = ${expected})`, () => expect(actual).not.toBe(expected));
                test(`expect(${b}**${i} = ${actual}).not.toEqual(int(${b}) ** ${i} = ${expected})`, () => expect(actual).not.toEqual(expected));
                test(`expect(${b}**${i} = ${actual}).toEqual(int(${b}) ** ${i} = ${expected})`, () => expect(actual).toEqual(expected))
            }
        }
        for (let a in [bool(false), bool(true)]) {
            for (let b in [bool(false), bool(true)]) {
                let int_b = int(b);
                let int_a = int(a);
                let int_a_amp_int_b = int_a & int_b;
                let int_a_pipe_int_b = int_a | int_b;
                let int_a_hat_int_b = int_a ^ int_b;
                let bool_int_a_amp_int_b = bool(int_a_amp_int_b);
                let bool_int_a_pipe_int_b = bool(int_a_pipe_int_b);
                let bool_int_a_hat_int_b = bool(int_a_hat_int_b);
                test(`expect(${a} & ${b} = ${a & b}).toBe(bool(int(${a}) & int(${b})) = ${bool_int_a_amp_int_b})`, () => expect(a & b).toBe(bool_int_a_amp_int_b));
                test(`expect(${a} | ${b} = ${a | b}).toBe(bool(int(${a}) | int(${b})) = ${bool_int_a_pipe_int_b})`, () => expect(a | b).toBe(bool_int_a_pipe_int_b));
                test(`expect(${a} ^ ${b} = ${a ^ b}).toBe(bool(int(${a}) ^ int(${b})) = ${bool_int_a_hat_int_b})`, () => expect(a ^ b).toBe(bool_int_a_hat_int_b));
                test(`expect(${a} & int(${b})).toEqual(int(${a}) & int(${b}))`, () => expect(a & int_b).toEqual(int_a_amp_int_b));
                test(`expect(${a} & int(${b})).not.toBe(bool(int(${a}) & int(${b})))`, () => expect(a & int_b).not.toBe(bool_int_a_amp_int_b));
                test(`expect(${a} | int(${b})).not.toBe(bool(int(${a}) | int(${b})))`, () => expect(a | int_b).not.toBe(bool_int_a_pipe_int_b));
                test(`expect(${a} ^ int(${b})).not.toBe(bool(int(${a}) ^ int(${b})))`, () => expect(a ^ int_b).not.toBe(bool_int_a_hat_int_b));
                test(`expect(int(${a}) & ${b}).not.toBe(bool(int(${a}) & int(${b})))`, () => expect(int_a & b).not.toBe(bool_int_a_amp_int_b));
                test(`expect(int(${a}) | ${b}).not.toBe(bool(int(${a}) | int(${b})))`, () => expect(int_a | b).not.toBe(bool_int_a_pipe_int_b));
                test(`expect(int(${a}) ^ ${b}).not.toBe(bool(int(${a}) ^ int(${b})))`, () => expect(int_a ^ b).not.toBe(bool_int_a_hat_int_b));
                test(`expect(${a} | int(${b})).toEqual(int(${a}) | int(${b}))`, () => expect(a | int_b).toEqual(int_a_pipe_int_b));
                test(`expect(${a} ^ int(${b})).toEqual(int(${a}) ^ int(${b}))`, () => expect(a ^ int_b).toEqual(int_a_hat_int_b));
                test(`expect(int(${a}) & ${b}).toEqual(int(${a}) & int(${b}))`, () => expect(int_a & b).toEqual(int_a_amp_int_b));
                test(`expect(int(${a}) | ${b}).toEqual(int(${a}) | int(${b}))`, () => expect(int_a | b).toEqual(int_a_pipe_int_b));
                test(`expect(int(${a}) ^ ${b}).toEqual(int(${a}) ^ int(${b}))`, () => expect(int_a ^ b).toEqual(int_a_hat_int_b))
            }
        }
        // line 129
        test(`expect(1 == 1).toBe(bool(true))`, () => expect(1 == 1).toBe(bool(true)));
        test(`expect(1 == 1).toEqual(bool(true))`, () => expect(1 == 1).toEqual(bool(true)));
        test(`expect(1 == 1).toBe(true)`, () => expect(1 == 1).toBe(true));
        test(`expect(1 == 1).toEqual(true)`, () => expect(1 == 1).toEqual(true));
        test(`expect(1 == 0).toBe(bool(false))`, () => expect(1 == 0).toBe(bool(false)));
        test(`expect(1 == 0).toEqual(bool(false))`, () => expect(1 == 0).toEqual(bool(false)));
        test(`expect(1 == 0).toBe(false)`, () => expect(1 == 0).toBe(false));
        test(`expect(1 == 0).toEqual(false)`, () => expect(1 == 0).toEqual(false));
        
        test(`expect(0 < 1).toBe(bool(true))`, () => expect(0 < 1).toBe(bool(true)));
        test(`expect(0 < 1).toEqual(bool(true))`, () => expect(0 < 1).toEqual(bool(true)));
        test(`expect(0 < 1).toBe(true)`, () => expect(0 < 1).toBe(true));
        test(`expect(0 < 1).toEqual(true)`, () => expect(0 < 1).toEqual(true));
        test(`expect(1 < 0).toBe(bool(false))`, () => expect(1 < 0).toBe(bool(false)));
        test(`expect(1 < 0).toEqual(bool(false))`, () => expect(1 < 0).toEqual(bool(false)));
        test(`expect(1 < 0).toBe(false)`, () => expect(1 < 0).toBe(false));
        test(`expect(1 < 0).toEqual(false)`, () => expect(1 < 0).toEqual(false));
        
        test(`expect(0 <= 0).toBe(bool(true))`, () => expect(0 <= 0).toBe(bool(true)));
        test(`expect(0 <= 0).toEqual(bool(true))`, () => expect(0 <= 0).toEqual(bool(true)));
        test(`expect(0 <= 0).toBe(true)`, () => expect(0 <= 0).toBe(true));
        test(`expect(0 <= 0).toEqual(true)`, () => expect(0 <= 0).toEqual(true));
        test(`expect(1 <= 0).toBe(bool(false))`, () => expect(1 <= 0).toBe(bool(false)));
        test(`expect(1 <= 0).toEqual(bool(false))`, () => expect(1 <= 0).toEqual(bool(false)));
        test(`expect(1 <= 0).toBe(false)`, () => expect(1 <= 0).toBe(false));
        test(`expect(1 <= 0).toEqual(false)`, () => expect(1 <= 0).toEqual(false));
        
        test(`expect(1 > 0).toBe(bool(true))`, () => expect(1 > 0).toBe(bool(true)));
        test(`expect(1 > 0).toEqual(bool(true))`, () => expect(1 > 0).toEqual(bool(true)));
        test(`expect(1 > 0).toBe(true)`, () => expect(1 > 0).toBe(true));
        test(`expect(1 > 0).toEqual(true)`, () => expect(1 > 0).toEqual(true));
        test(`expect(1 > 1).toBe(bool(false))`, () => expect(1 > 1).toBe(bool(false)));
        test(`expect(1 > 1).toEqual(bool(false))`, () => expect(1 > 1).toEqual(bool(false)));
        test(`expect(1 > 1).toBe(false)`, () => expect(1 > 1).toBe(false));
        test(`expect(1 > 1).toEqual(false)`, () => expect(1 > 1).toEqual(false));
        
        test(`expect(1 >= 1).toBe(bool(true))`, () => expect(1 >= 1).toBe(bool(true)));
        test(`expect(1 >= 1).toEqual(bool(true))`, () => expect(1 >= 1).toEqual(bool(true)));
        test(`expect(1 >= 1).toBe(true)`, () => expect(1 >= 1).toBe(true));
        test(`expect(1 >= 1).toEqual(true)`, () => expect(1 >= 1).toEqual(true));
        test(`expect(0 >= 1).toBe(bool(false))`, () => expect(0 >= 1).toBe(bool(false)));
        test(`expect(0 >= 1).toEqual(bool(false))`, () => expect(0 >= 1).toEqual(bool(false)));
        test(`expect(0 >= 1).toBe(false)`, () => expect(0 >= 1).toBe(false));
        test(`expect(0 >= 1).toEqual(false)`, () => expect(0 >= 1).toEqual(false));
        
        test(`expect(0 != 1).toBe(bool(true))`, () => expect(0 != 1).toBe(bool(true)));
        test(`expect(0 != 1).toEqual(bool(true))`, () => expect(0 != 1).toEqual(bool(true)));
        test(`expect(0 != 1).toBe(true)`, () => expect(0 != 1).toBe(true));
        test(`expect(0 != 1).toEqual(true)`, () => expect(0 != 1).toEqual(true));
        test(`expect(0 != 0).toBe(bool(false))`, () => expect(0 != 0).toBe(bool(false)));
        test(`expect(0 != 0).toEqual(bool(false))`, () => expect(0 != 0).toEqual(bool(false)));
        test(`expect(0 != 0).toBe(false)`, () => expect(0 != 0).toBe(false));
        test(`expect(0 != 0).toEqual(false)`, () => expect(0 != 0).toEqual(false));
        
        let x = [1];
        test(`expect(Object.is(x, x)).toBe(bool(true))`, () => expect(Object.is(x, x)).toBe(bool(true)));
        test(`expect(Object.is(x, x)).toBe(true)`, () => expect(Object.is(x, x)).toBe(true));
        test(`expect(Object.is(x, x)).toEqual(bool(true))`, () => expect(Object.is(x, x)).toEqual(bool(true)));
        test(`expect(Object.is(x, x)).toEqual(true)`, () => expect(Object.is(x, x)).toEqual(true));
        
        test(`expect(!Object.is(x, x)).toBe(bool(false))`, () => expect(!Object.is(x, x)).toBe(bool(false)));
        test(`expect(!Object.is(x, x)).toBe(false)`, () => expect(!Object.is(x, x)).toBe(false));
        test(`expect(!Object.is(x, x)).toEqual(bool(false))`, () => expect(!Object.is(x, x)).toEqual(bool(false)));
        test(`expect(!Object.is(x, x)).toEqual(false)`, () => expect(!Object.is(x, x)).toEqual(false));
        
        test(`expect(x.includes(1)).toBe(bool(true))`, () => expect(x.includes(1)).toBe(bool(true)));
        test(`expect(x.includes(1)).toBe(true)`, () => expect(x.includes(1)).toBe(true));
        test(`expect(x.includes(1)).toEqual(bool(true))`, () => expect(x.includes(1)).toEqual(bool(true)));
        test(`expect(x.includes(1)).toEqual(true)`, () => expect(x.includes(1)).toEqual(true));
        
        test(`expect(x.includes(0)).toBe(bool(false))`, () => expect(x.includes(0)).toBe(bool(false)));
        test(`expect(x.includes(0)).toBe(false)`, () => expect(x.includes(0)).toBe(false));
        test(`expect(x.includes(0)).toEqual(bool(false))`, () => expect(x.includes(0)).toEqual(bool(false)));
        test(`expect(x.includes(0)).toEqual(false)`, () => expect(x.includes(0)).toEqual(false));
        
        test(`expect(!x.includes(1)).toBe(bool(false))`, () => expect(!x.includes(1)).toBe(bool(false)));
        test(`expect(!x.includes(1)).toBe(false)`, () => expect(!x.includes(1)).toBe(false));
        test(`expect(!x.includes(1)).toEqual(bool(false))`, () => expect(!x.includes(1)).toEqual(bool(false)));
        test(`expect(!x.includes(1)).toEqual(false)`, () => expect(!x.includes(1)).toEqual(false));
        
        test(`expect(!x.includes(0)).toBe(bool(true))`, () => expect(!x.includes(0)).toBe(bool(true)));
        test(`expect(!x.includes(0)).toBe(true)`, () => expect(!x.includes(0)).toBe(true));
        test(`expect(!x.includes(0)).toEqual(bool(true))`, () => expect(!x.includes(0)).toEqual(bool(true)));
        test(`expect(!x.includes(0)).toEqual(true)`, () => expect(!x.includes(0)).toEqual(true));
        
        x = {1: 2};
        // TODO: x === x?
        test(`expect(Object.is(x, x)).toBe(bool(true))`, () => expect(Object.is(x, x)).toBe(bool(true)));
        test(`expect(Object.is(x, x)).toBe(true)`, () => expect(Object.is(x, x)).toBe(true));
        test(`expect(Object.is(x, x)).toEqual(bool(true))`, () => expect(Object.is(x, x)).toEqual(bool(true)));
        test(`expect(Object.is(x, x)).toEqual(true)`, () => expect(Object.is(x, x)).toEqual(true));
        
        test(`expect(!Object.is(x, x)).toBe(bool(false))`, () => expect(!Object.is(x, x)).toBe(bool(false)));
        test(`expect(!Object.is(x, x)).toBe(false)`, () => expect(!Object.is(x, x)).toBe(false));
        test(`expect(!Object.is(x, x)).toEqual(bool(false))`, () => expect(!Object.is(x, x)).toEqual(bool(false)));
        test(`expect(!Object.is(x, x)).toEqual(false)`, () => expect(!Object.is(x, x)).toEqual(false));
        
        test(`expect(1 in x).toBe(bool(true))`, () => expect(1 in x).toBe(bool(true)));
        test(`expect(1 in x).toBe(true)`, () => expect(1 in x).toBe(true));
        test(`expect(1 in x).toEqual(bool(true))`, () => expect(1 in x).toEqual(bool(true)));
        test(`expect(1 in x).toEqual(true)`, () => expect(1 in x).toEqual(true));
        
        test(`expect(0 in x).toBe(bool(false))`, () => expect(0 in x).toBe(bool(false)));
        test(`expect(0 in x).toBe(false)`, () => expect(0 in x).toBe(false));
        test(`expect(0 in x).toEqual(bool(false))`, () => expect(0 in x).toEqual(bool(false)));
        test(`expect(0 in x).toEqual(false)`, () => expect(0 in x).toEqual(false));
        
        test(`expect(!(1 in x)).toBe(bool(false))`, () => expect(!(1 in x)).toBe(bool(false)));
        test(`expect(!(1 in x)).toBe(false)`, () => expect(!(1 in x)).toBe(false));
        test(`expect(!(1 in x)).toEqual(bool(false))`, () => expect(!(1 in x)).toEqual(bool(false)));
        test(`expect(!(1 in x)).toEqual(false)`, () => expect(!(1 in x)).toEqual(false));
        
        test(`expect(!(0 in x)).toBe(bool(true))`, () => expect(!(0 in x)).toBe(bool(true)));
        test(`expect(!(0 in x)).toBe(true)`, () => expect(!(0 in x)).toBe(true));
        test(`expect(!(0 in x)).toEqual(bool(true))`, () => expect(!(0 in x)).toEqual(bool(true)));
        test(`expect(!(0 in x)).toEqual(true)`, () => expect(!(0 in x)).toEqual(true));
        
        // line 160
        toEqualAndBeVanillaAndBool(Object.is(!bool(true)), false, 'self.assertIs(not True, False)');
        toEqualAndBeVanillaAndBool(Object.is(!bool(false)), true, 'self.assertIs(not False, True)');
        
        
    })
});
