import {bool} from "../bool"
import {int} from "../int"

/**toBe(..), toEqual(..)*/
function toEqualAndBeVanilla(actual, expected, description = undefined, not = false) {
    if (description) {
        describe(description, () => {
            test(`expect(${actual}).toBe(${expected})`, () => expect(actual).toBe(expected));
            test(`expect(${actual}).toEqual(${expected})`, () => expect(actual).toEqual(expected))
        });
    } else {
        test(`expect(${actual}).toBe(${expected})`, () => expect(actual).toBe(expected));
        test(`expect(${actual}).toEqual(${expected})`, () => expect(actual).toEqual(expected))
    }
}

/**toBe(bool(..)), toEqual(bool(..))*/
function toEqualAndBeBool(actual, expected, description = undefined, not = false) {
    const name = verb => `expect(${actual})${not ? '.not' : ''}.to${verb}(bool(${expected}) = ${bool(expected)})`;
    const tests = () => {
        const toBe = name('Be');
        const toEqual = name('Equal');
        if (not) {
            test(toBe, () => expect(actual).not.toBe(bool(expected)));
            test(toEqual, () => expect(actual).not.toEqual(bool(expected)))
        } else {
            test(toBe, () => expect(actual).toBe(bool(expected)));
            test(toEqual, () => expect(actual).toEqual(bool(expected)))
        }
    };
    if (description) {
        describe(description, tests);
    } else {
        tests();
        
    }
}

/**toBe(..), toBe(bool(..)), toEqual(..), toEqual(bool(..))*/
function toEqualAndBeVanillaAndBool(actual, expected, description = undefined) {
    if (description) {
        describe(description, () => {
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
                toEqualAndBeBool(b ** i, bool(int(b) ** i), 'self.assertIsNot(b**i, bool(int(b)**i))', true);
                toEqualAndBeVanilla(b ** i, int(b) ** i, 'self.assertEqual(b**i, int(b)**i)');
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
                test(`expect(${a} & ${b} = ${a & b}).toBe(bool(int(${a}) & int(${b})) = ${bool_int_a_amp_int_b})`,
                    () => expect(a & b).toBe(bool_int_a_amp_int_b));
                
                test(`expect(${a} | ${b} = ${a | b}).toBe(bool(int(${a}) | int(${b})) = ${bool_int_a_pipe_int_b})`,
                    () => expect(a | b).toBe(bool_int_a_pipe_int_b));
                
                test(`expect(${a} ^ ${b} = ${a ^ b}).toBe(bool(int(${a}) ^ int(${b})) = ${bool_int_a_hat_int_b})`,
                    () => expect(a ^ b).toBe(bool_int_a_hat_int_b));
                
                test(`expect(${a} & int(${b})).toEqual(int(${a}) & int(${b}))`,
                    () => expect(a & int_b).toEqual(int_a_amp_int_b));
                
                test(`expect(${a} & int(${b})).not.toBe(bool(int(${a}) & int(${b})))`,
                    () => expect(a & int_b).not.toBe(bool_int_a_amp_int_b));
                
                test(`expect(${a} | int(${b})).not.toBe(bool(int(${a}) | int(${b})))`,
                    () => expect(a | int_b).not.toBe(bool_int_a_pipe_int_b));
                
                test(`expect(${a} ^ int(${b})).not.toBe(bool(int(${a}) ^ int(${b})))`,
                    () => expect(a ^ int_b).not.toBe(bool_int_a_hat_int_b));
                
                test(`expect(int(${a}) & ${b}).not.toBe(bool(int(${a}) & int(${b})))`,
                    () => expect(int_a & b).not.toBe(bool_int_a_amp_int_b));
                
                test(`expect(int(${a}) | ${b}).not.toBe(bool(int(${a}) | int(${b})))`,
                    () => expect(int_a | b).not.toBe(bool_int_a_pipe_int_b));
                
                test(`expect(int(${a}) ^ ${b}).not.toBe(bool(int(${a}) ^ int(${b})))`,
                    () => expect(int_a ^ b).not.toBe(bool_int_a_hat_int_b));
                
                test(`expect(${a} | int(${b})).toEqual(int(${a}) | int(${b}))`,
                    () => expect(a | int_b).toEqual(int_a_pipe_int_b));
                
                test(`expect(${a} ^ int(${b})).toEqual(int(${a}) ^ int(${b}))`,
                    () => expect(a ^ int_b).toEqual(int_a_hat_int_b));
                
                test(`expect(int(${a}) & ${b}).toEqual(int(${a}) & int(${b}))`,
                    () => expect(int_a & b).toEqual(int_a_amp_int_b));
                
                test(`expect(int(${a}) | ${b}).toEqual(int(${a}) | int(${b}))`,
                    () => expect(int_a | b).toEqual(int_a_pipe_int_b));
                
                test(`expect(int(${a}) ^ ${b}).toEqual(int(${a}) ^ int(${b}))`,
                    () => expect(int_a ^ b).toEqual(int_a_hat_int_b))
            }
        }
        // line 129
        toEqualAndBeVanillaAndBool(1 == 1, true, 'self.assertIs(1==1, True)');
        toEqualAndBeVanillaAndBool(1 == 0, false, 'self.assertIs(1==0, False)');
        toEqualAndBeVanillaAndBool(0 < 1, true, 'self.assertIs(0<1, True)');
        toEqualAndBeVanillaAndBool(1 < 0, false, 'self.assertIs(1<0, False)');
        toEqualAndBeVanillaAndBool(0 <= 0, true, 'self.assertIs(0<=0, True)');
        toEqualAndBeVanillaAndBool(1 <= 0, false, 'self.assertIs(1<=0, False)');
        toEqualAndBeVanillaAndBool(1 > 0, true, 'self.assertIs(1>0, True)');
        toEqualAndBeVanillaAndBool(1 > 1, false, 'self.assertIs(1>1, False)');
        toEqualAndBeVanillaAndBool(1 >= 1, true, 'self.assertIs(1>=1, True)');
        toEqualAndBeVanillaAndBool(0 >= 1, false, 'self.assertIs(0>=1, False)');
        toEqualAndBeVanillaAndBool(0 != 1, true, 'self.assertIs(0!=1, True)');
        toEqualAndBeVanillaAndBool(0 != 0, false, 'self.assertIs(0!=0, False)');
        
        // line 142
        let list = [1];
        toEqualAndBeVanillaAndBool(Object.is(list, list), true, 'self.assertIs(x is x, True)');
        toEqualAndBeVanillaAndBool(!Object.is(list, list), false, 'self.assertIs(x is not x, False)');
        
        // line 146
        toEqualAndBeVanillaAndBool(list.includes(1), true, 'self.assertIs(1 in x, True)');
        toEqualAndBeVanillaAndBool(list.includes(0), false, 'self.assertIs(0 in x, False)');
        toEqualAndBeVanillaAndBool(!list.includes(1), false, 'self.assertIs(1 not in x, False)');
        toEqualAndBeVanillaAndBool(!list.includes(0), true, 'self.assertIs(0 not in list, True)');
        
        let obj = {1: 2};
        // TODO: obj === obj?
        // line 152
        toEqualAndBeVanillaAndBool(Object.is(obj, obj), true, 'self.assertIs(obj is obj, True)');
        toEqualAndBeVanillaAndBool(!Object.is(obj, obj), false, 'self.assertIs(obj is not obj, False)');
        
        // line 155
        toEqualAndBeVanillaAndBool((1 in obj), true, 'self.assertIs(1 in obj, True)');
        toEqualAndBeVanillaAndBool((0 in obj), false, 'self.assertIs(0 in obj, False)');
        toEqualAndBeVanillaAndBool(!(1 in obj), false, 'self.assertIs(1 not in obj, False)');
        toEqualAndBeVanillaAndBool(!(0 in obj), true, 'self.assertIs(0 not in obj, True)');
        
        // line 160
        toEqualAndBeVanillaAndBool(Object.is(!bool(true)), false, 'self.assertIs(not True, False)');
        toEqualAndBeVanillaAndBool(Object.is(!bool(false)), true, 'self.assertIs(not False, True)');
        
        
    })
});
