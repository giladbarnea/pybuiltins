import {bool} from "../bool"
import {int} from "../int"

type Verb = 'Be' | 'Equal'
type TestOptions = { not?: boolean, skip?: boolean };

function _toEqualAndBe(actual, expected, description = undefined, options: TestOptions & { vanilla: boolean }) {
    let {vanilla, not, skip} = options;
    const toWhat = vanilla ? `${expected}` : `bool(${expected}) = ${bool(expected)}`;
    if (!vanilla)
        expected = bool(expected);
    
    const tests = () => {
        const _name = (verb: Verb) => `expect(${actual})${not ? '.not' : ''}.to${verb}(${toWhat})`;
        let _test;
        if (skip)
            _test = (verb: Verb, fn) => test.skip(_name(verb), fn(verb));
        else
            _test = (verb: Verb, fn) => test(_name(verb), fn(verb));
        let fn;
        if (not)
            fn = (verb: Verb) => () => expect(actual).not[`to${verb}`](expected);
        else
            fn = (verb: Verb) => () => expect(actual)[`to${verb}`](expected);
        
        _test('Be', fn);
        _test('Equal', fn);
        
    };
    if (description)
        describe(description, tests);
    else
        tests();
    
    
}


/**toBe(..), toEqual(..)*/
function toEqualAndBeVanilla(actual, expected, description = undefined, options: TestOptions = {}) {
    let {not, skip} = options;
    _toEqualAndBe(actual, expected, description, {vanilla: true, not, skip});
    
    
}

/**toBe(bool(..)), toEqual(bool(..))*/
function toEqualAndBeBool(actual, expected, description = undefined, options: TestOptions = {}) {
    let {not, skip} = options;
    _toEqualAndBe(actual, expected, description, {vanilla: false, not, skip});
}


/**toBe(..), toBe(bool(..)), toEqual(..), toEqual(bool(..))*/
function toEqualAndBeVanillaAndBool(actual, expected, description = undefined, options: TestOptions = {}) {
    
    const tests = () => {
        toEqualAndBeVanilla(actual, expected, undefined, options);
        toEqualAndBeBool(actual, expected, undefined, options);
    };
    if (description)
        describe(description, tests);
    else
        tests()
    
}

const not = (() => ({
    toEqualAndBeVanilla: (actual, expected, description = undefined) =>
        toEqualAndBeVanilla(actual, expected, description, {not: true}),
    
    toEqualAndBeBool: (actual, expected, description = undefined) =>
        toEqualAndBeBool(actual, expected, description, {not: true}),
    
    toEqualAndBeVanillaAndBool: (actual, expected, description = undefined) =>
        toEqualAndBeVanillaAndBool(actual, expected, description, {not: true})
    
}))();

const skip = (() => ({
    toEqualAndBeVanilla: (actual, expected, description = undefined) =>
        toEqualAndBeVanilla(actual, expected, description, {skip: true}),
}))();
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
        // partially fail because testing int(n) is n
        toEqualAndBeVanilla(int(bool(false)), 0, 'assertEqual(int(False), 0)');
        not.toEqualAndBeVanillaAndBool(int(bool(false)), true, 'assertIsNot(int(False), False)');
        toEqualAndBeVanilla(int(bool(true)), 1, 'assertEqual(int(True), 1)');
        not.toEqualAndBeVanillaAndBool(int(bool(true)), true, 'assertIsNot(int(True), True)')
        
    });
    describe('test_math', () => {
        // line 55
        toEqualAndBeVanilla(+bool(false), 0, 'assertEqual(+False, 0)');
        not.toEqualAndBeVanillaAndBool(+bool(false), bool(false), 'assertIsNot(+False, False)');
        
        // TODO: pass
        skip.toEqualAndBeVanilla(-bool(false), 0, 'assertEqual(-False, 0)');
        
        not.toEqualAndBeVanillaAndBool(-bool(false), bool(false), 'assertIsNot(-False, False)');
        toEqualAndBeVanilla(Math.abs(bool(false)), 0, 'assertEqual(abs(False), 0)');
        not.toEqualAndBeVanillaAndBool(Math.abs(bool(false)), bool(false), 'assertIsNot(abs(False), False)');
        toEqualAndBeVanilla(+bool(true), 1, 'assertEqual(+True, 1)');
        not.toEqualAndBeVanillaAndBool(+bool(true), bool(true), 'assertIsNot(+True, True)');
        toEqualAndBeVanilla(-bool(true), -1, 'assertEqual(-True, -1)');
        toEqualAndBeVanilla(Math.abs(bool(true)), 1, 'assertEqual(abs(True), 1)');
        not.toEqualAndBeVanillaAndBool(Math.abs(bool(true)), bool(true), 'assertIsNot(abs(True), True)');
        toEqualAndBeVanilla(~bool(false), -1, 'assertEqual(~False, -1)');
        toEqualAndBeVanilla(~bool(true), -2, 'assertEqual(~True, -2)');
        
        
        // line 69
        toEqualAndBeVanilla(bool(false) + 2, 2, 'assertEqual(False+2, 2)');
        toEqualAndBeVanilla(bool(true) + 2, 3, 'assertEqual(True+2, 3)');
        toEqualAndBeVanilla(2 + bool(false), 2, 'assertEqual(2+False, 2)');
        toEqualAndBeVanilla(2 + bool(true), 3, 'assertEqual(2+True, 3)');
        
        // line 74
        toEqualAndBeVanilla(bool(false) + bool(false), 0, 'assertEqual(False+False, 0)');
        not.toEqualAndBeVanillaAndBool(bool(false) + bool(false), false, 'assertIsNot(False+False, False)');
        toEqualAndBeVanilla(bool(false) + bool(true), 1, 'assertEqual(False+True, 1)');
        not.toEqualAndBeVanillaAndBool(bool(false) + bool(true), true, 'assertIsNot(False+True, True)');
        toEqualAndBeVanilla(bool(true) + bool(false), 1, 'assertEqual(True+False, 1)');
        not.toEqualAndBeVanillaAndBool(bool(true) + bool(false), true, 'assertIsNot(True+False, True)');
        toEqualAndBeVanilla(bool(true) + bool(true), 2, 'assertEqual(True+True, 2)');
        
        // line 82
        toEqualAndBeVanilla(bool(true) - bool(true), 0, 'assertEqual(True-True, 0)');
        not.toEqualAndBeVanillaAndBool(bool(true) - bool(true), false, 'assertIsNot(True-True, False)');
        toEqualAndBeVanilla(bool(false) - bool(false), 0, 'assertEqual(False-False, 0)');
        not.toEqualAndBeVanillaAndBool(bool(false) - bool(false), false, 'assertIsNot(False-False, False)');
        toEqualAndBeVanilla(bool(true) - bool(false), 1, 'assertEqual(True-False, 1)');
        not.toEqualAndBeVanillaAndBool(bool(true) - bool(false), true, 'assertIsNot(True-False, True)');
        toEqualAndBeVanilla(bool(false) - bool(true), -1, 'assertEqual(False-True, -1)');
        
        // line 90
        toEqualAndBeVanilla(bool(true) * 1, 1, 'assertEqual(True*1, 1)');
        toEqualAndBeVanilla(bool(false) * 1, 0, 'assertEqual(False*1, 0)');
        not.toEqualAndBeVanillaAndBool(bool(false) * 1, false, 'assertIsNot(False*1, False)');
        
        // line 94
        toEqualAndBeVanilla(bool(true) / 1, 1, 'assertEqual(True/1, 1)');
        not.toEqualAndBeVanillaAndBool(bool(true) / 1, true, 'assertIsNot(True/1, True)');
        toEqualAndBeVanilla(bool(false) / 1, 0, 'assertEqual(False/1, 0)');
        not.toEqualAndBeVanillaAndBool(bool(false) / 1, false, 'assertIsNot(False/1, False)');
        
        // line 99
        toEqualAndBeVanilla(bool(true) % 1, 0, 'assertEqual(True%1, 0)');
        not.toEqualAndBeVanillaAndBool(bool(true) % 2, false, 'assertIsNot(True%1, False)');
        toEqualAndBeVanilla(bool(true) % 2, 1, 'assertEqual(True%2, 1)');
        not.toEqualAndBeVanillaAndBool(bool(true) % 2, true, 'assertIsNot(True%2, True)');
        toEqualAndBeVanilla(bool(false) % 1, 0, 'assertEqual(False%1, 0)');
        not.toEqualAndBeVanillaAndBool(bool(false) % 1, false, 'assertIsNot(False%1, False)');
        
        // /Lib/test/test_bool.py.test_math:106
        for (let b of [bool(false), bool(true)]) {
            for (let i of [0, 1, 2]) {
                not.toEqualAndBeBool(b ** i, bool(int(b) ** i), 'assertIsNot(b**i, bool(int(b)**i))');
                toEqualAndBeVanilla(b ** i, int(b) ** i, 'assertEqual(b**i, int(b)**i)');
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
        toEqualAndBeVanillaAndBool(1 == 1, true, 'assertIs(1==1, True)');
        toEqualAndBeVanillaAndBool(1 == 0, false, 'assertIs(1==0, False)');
        toEqualAndBeVanillaAndBool(0 < 1, true, 'assertIs(0<1, True)');
        toEqualAndBeVanillaAndBool(1 < 0, false, 'assertIs(1<0, False)');
        toEqualAndBeVanillaAndBool(0 <= 0, true, 'assertIs(0<=0, True)');
        toEqualAndBeVanillaAndBool(1 <= 0, false, 'assertIs(1<=0, False)');
        toEqualAndBeVanillaAndBool(1 > 0, true, 'assertIs(1>0, True)');
        toEqualAndBeVanillaAndBool(1 > 1, false, 'assertIs(1>1, False)');
        toEqualAndBeVanillaAndBool(1 >= 1, true, 'assertIs(1>=1, True)');
        toEqualAndBeVanillaAndBool(0 >= 1, false, 'assertIs(0>=1, False)');
        toEqualAndBeVanillaAndBool(0 != 1, true, 'assertIs(0!=1, True)');
        toEqualAndBeVanillaAndBool(0 != 0, false, 'assertIs(0!=0, False)');
        
        // line 142
        let list = [1];
        toEqualAndBeVanillaAndBool(Object.is(list, list), true, 'assertIs(x is x, True)');
        toEqualAndBeVanillaAndBool(!Object.is(list, list), false, 'assertIs(x is not x, False)');
        
        // line 146
        toEqualAndBeVanillaAndBool(list.includes(1), true, 'assertIs(1 in x, True)');
        toEqualAndBeVanillaAndBool(list.includes(0), false, 'assertIs(0 in x, False)');
        toEqualAndBeVanillaAndBool(!list.includes(1), false, 'assertIs(1 not in x, False)');
        toEqualAndBeVanillaAndBool(!list.includes(0), true, 'assertIs(0 not in list, True)');
        
        let obj = {1: 2};
        // TODO: obj === obj?
        // line 152
        toEqualAndBeVanillaAndBool(Object.is(obj, obj), true, 'assertIs(obj is obj, True)');
        toEqualAndBeVanillaAndBool(!Object.is(obj, obj), false, 'assertIs(obj is not obj, False)');
        
        // line 155
        toEqualAndBeVanillaAndBool((1 in obj), true, 'assertIs(1 in obj, True)');
        toEqualAndBeVanillaAndBool((0 in obj), false, 'assertIs(0 in obj, False)');
        toEqualAndBeVanillaAndBool(!(1 in obj), false, 'assertIs(1 not in obj, False)');
        toEqualAndBeVanillaAndBool(!(0 in obj), true, 'assertIs(0 not in obj, True)');
        
        // line 160
        toEqualAndBeVanillaAndBool(Object.is(!bool(true)), false, 'assertIs(not True, False)');
        toEqualAndBeVanillaAndBool(Object.is(!bool(false)), true, 'assertIs(not False, True)');
        
        
    })
});
