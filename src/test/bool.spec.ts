import {bool} from "../bool"
import {int} from "../int"
import {str} from "../str";
import {float} from "../float";
import {set} from "../set";
import {complex} from "../complex";
import {dict} from "../dict";
import {list} from "../list";
import {object} from "../object";
import {tuple} from "../tuple";
import {type} from "../type";
import {cc} from "../util";

type Verb = 'Be' | 'Equal'
type TestOptions = { not?: boolean, skip?: boolean, log?: boolean };


function _suiteLineno() {
    const stack = (new Error).stack.split("\n");
    let call = stack.find(x => x.includes('Suite.describe'));
    let lineno = call.substr(call.indexOf('bool.spec.ts') + 13);
    return lineno;
}

function _toEqualAndBe(actual, expected, description = undefined, options: TestOptions & { vanilla: boolean }) {
    
    
    let {vanilla, not, skip, log} = options;
    const toWhat = vanilla ? `${expected}` : `bool(${expected}) = ${bool(expected)}`;
    if (!vanilla)
        expected = bool(expected, log);
    
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
    if (description) {
        
        description = `(${_suiteLineno()} ${description}`;
        describe(description, tests);
        // console.log();
    } else {
        tests();
    }
    
    
}


/**toBe(..), toEqual(..)*/
function toEqualAndBeVanilla(actual, expected, description = undefined, options: TestOptions = {}) {
    let {not, skip, log} = options;
    _toEqualAndBe(actual, expected, description, {vanilla: true, not, skip, log});
    
    
}

/**toBe(bool(..)), toEqual(bool(..))*/
function toEqualAndBeBool(actual, expected, description = undefined, options: TestOptions = {}) {
    let {not, skip, log} = options;
    _toEqualAndBe(actual, expected, description, {vanilla: false, not, skip, log});
}


/**toBe(..), toBe(bool(..)), toEqual(..), toEqual(bool(..))*/
function toEqualAndBeVanillaAndBool(actual, expected, description = undefined, options: TestOptions = {}) {
    
    const tests = () => {
        toEqualAndBeVanilla(actual, expected, undefined, options);
        toEqualAndBeBool(actual, expected, undefined, options);
    };
    if (description) {
        description = `(${_suiteLineno()} ${description}`;
        describe(description, tests);
    } else {
        tests()
    }
    
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
    toEqualAndBeVanillaAndBool: (actual, expected, description = undefined) =>
        toEqualAndBeVanillaAndBool(actual, expected, description, {skip: true}),
}))();
describe(`My Tests`, () => {
    
    test('expect(bool([])).toEqual(false)', () => expect(bool([])).toEqual(false));
    
    it('expect(bool(false)).toEqual(false)', () => expect(bool(false)).toEqual(false));
    test('expect(bool({})).toEqual(false))', () => expect(bool({})).toEqual(false))
});
describe.skip(`CPython Tests: Strict Equality Equivalents`, () => {
    test(`expect(int(bool(false))).toBe(0)`, () => expect(expect(int(bool(false))).toBe(0)));
});
describe(`CPython Tests`, () => {
    test.skip('test_subclass', () =>
        expect(() => {
            class C extends bool {
                pass
            }
        }).toThrowError());
    describe.skip(`test_print`, () => {
    
    });
    describe.skip(`test_str`, () => {
    
    });
    describe(`test_int`, () => {
        // partially fail because testing int(n) is n
        toEqualAndBeVanilla(int(bool(false)), 0, 'assertEqual(int(False), 0)');
        not.toEqualAndBeVanillaAndBool(int(bool(false)), true, 'assertIsNot(int(False), False)');
        toEqualAndBeVanilla(int(bool(true)), 1, 'assertEqual(int(True), 1)');
        not.toEqualAndBeVanillaAndBool(int(bool(true)), true, 'assertIsNot(int(True), True)')
        
    });
    describe.skip(`test_float`, () => {
    
    });
    describe('test_math', () => {
        // line 55
        toEqualAndBeVanilla(+bool(false), 0, 'assertEqual(+False, 0)');
        not.toEqualAndBeVanillaAndBool(+bool(false), bool(false), 'assertIsNot(+False, False)');
        
        // fails because -0 is not 0 in javascript
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
                // console.log(cc('black', `b: ${b}, i: ${i}`));
                not.toEqualAndBeBool(b ** i, bool(int(b) ** i), `assertIsNot(b**${i}, bool(int(b)**${i}))`);
                toEqualAndBeVanilla(b ** i, int(b) ** i, `assertEqual(b**${i}, int(b)**${i})`);
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
        const letest = test('LETEST', () => expect(1).toEqual(2));
        
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
        toEqualAndBeVanillaAndBool(!bool(true), false, 'assertIs(not True, False)');
        toEqualAndBeVanillaAndBool(!bool(false), true, 'assertIs(not False, True)');
        
        
    });
    describe(`test_convert`, () => {
        // (,,'assertRaises(TypeError, bool, 42, 42)');
        test('bool(42, 42) TypeError', () => expect(bool(42, 42)).toThrow(new TypeError(`bool() takes at most 1 argument (2 given)`)));
        toEqualAndBeVanillaAndBool(bool(10), true, 'assertIs(bool(10), True)');
        toEqualAndBeVanillaAndBool(bool(1), true, 'assertIs(bool(1), True)');
        toEqualAndBeVanillaAndBool(bool(-1), true, 'assertIs(bool(-1), True)');
        toEqualAndBeVanillaAndBool(bool(0), false, 'assertIs(bool(0), False)');
        toEqualAndBeVanillaAndBool(bool("hello"), true, 'assertIs(bool("hello"), True)');
        toEqualAndBeVanillaAndBool(bool(""), false, 'assertIs(bool(""), False)');
        toEqualAndBeVanillaAndBool(bool(), false, 'assertIs(bool(), False)');
    });
    describe.skip(`test_format`, () => {
        // TODO: "%d" % False might not be possible, consider str("%d" something
    });
    describe.skip(`test_hasattr`, () => {
    
    });
    describe.skip(`test_callable`, () => {
    
    });
    describe.skip(`test_isinstance`, () => {
    
    });
    describe.skip(`test_issubclass`, () => {
    
    });
    describe(`test_contains`, () => {
        toEqualAndBeVanillaAndBool(1 in {}, false, 'assertIs(1 in {}, False)');
        toEqualAndBeVanillaAndBool(1 in {1: 1}, true, 'assertIs(1 in {1:1}, True)');
    });
    describe(`test_string`, () => {
        toEqualAndBeVanillaAndBool("xyz".endsWith("z"), true, 'assertIs("xyz".endswith("z"), True)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").endswith("z"), true, 'assertIs("xyz".endswith("z"), True)');
        toEqualAndBeVanillaAndBool("xyz".endsWith("x"), false, 'assertIs("xyz".endswith("x"), False)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").endswith("x"), false, 'assertIs("xyz".endswith("z"), True)');
        skip.toEqualAndBeVanillaAndBool(str("xyz0123").isalnum(), true, 'assertIs("xyz0123".isalnum(), True)');
        skip.toEqualAndBeVanillaAndBool(str("@#$%").isalnum(), false, 'assertIs("@#$%".isalnum(), False)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").isalpha(), true, 'assertIs("xyz".isalpha(), True)');
        skip.toEqualAndBeVanillaAndBool(str("@#$%").isalpha(), false, 'assertIs("@#$%".isalpha(), False)');
        skip.toEqualAndBeVanillaAndBool(str("0123").isdigit(), true, 'assertIs("0123".isdigit(), True)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").isdigit(), false, 'assertIs("xyz".isdigit(), False)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").islower(), true, 'assertIs("xyz".islower(), True)');
        skip.toEqualAndBeVanillaAndBool(str("XYZ").islower(), false, 'assertIs("XYZ".islower(), False)');
        skip.toEqualAndBeVanillaAndBool(str("0123").isdecimal(), true, 'assertIs("0123".isdecimal(), True)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").isdecimal(), false, 'assertIs("xyz".isdecimal(), False)');
        skip.toEqualAndBeVanillaAndBool(str("0123").isnumeric(), true, 'assertIs("0123".isnumeric(), True)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").isnumeric(), false, 'assertIs("xyz".isnumeric(), False)');
        skip.toEqualAndBeVanillaAndBool(str(" ").isspace(), true, 'assertIs(" ".isspace(), True)');
        skip.toEqualAndBeVanillaAndBool(str("\xa0").isspace(), true, 'assertIs("\xa0".isspace(), True)');
        skip.toEqualAndBeVanillaAndBool(str("\u3000").isspace(), true, 'assertIs("\u3000".isspace(), True)');
        skip.toEqualAndBeVanillaAndBool(str("XYZ").isspace(), false, 'assertIs("XYZ".isspace(), False)');
        skip.toEqualAndBeVanillaAndBool(str("X").istitle(), true, 'assertIs("X".istitle(), True)');
        skip.toEqualAndBeVanillaAndBool(str("x").istitle(), false, 'assertIs("x".istitle(), False)');
        skip.toEqualAndBeVanillaAndBool(str("XYZ").isupper(), true, 'assertIs("XYZ".isupper(), True)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").isupper(), false, 'assertIs("xyz".isupper(), False)');
        toEqualAndBeVanillaAndBool("xyz".startsWith("x"), true, 'assertIs("xyz".startswith("x"), True)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").startswith("x"), true, 'assertIs("xyz".startswith("x"), True)');
        toEqualAndBeVanillaAndBool("xyz".startsWith("z"), false, 'assertIs("xyz".startswith("z"), False)');
        skip.toEqualAndBeVanillaAndBool(str("xyz").startswith("z"), false, 'assertIs("xyz".startswith("z"), False)');
    });
    
    // line 233
    // TODO: all besdies not instanceof fail
    describe(`test_boolean`, () => {
        
        toEqualAndBeVanillaAndBool(bool(true) & 1, 1, 'assertEqual(True & 1, 1)');
        test('(bool(true) & 1).not.toBeInstanceOf(Boolean)', () => expect(bool(true) & 1).not.toBeInstanceOf(Boolean));
        toEqualAndBeVanillaAndBool(bool(true) & bool(true), true, 'assertIs(True & True, True)');
        
        toEqualAndBeVanillaAndBool(bool(true) | 1, 1, 'assertEqual(True | 1, 1)');
        test('(bool(true) | 1).not.toBeInstanceOf(Boolean)', () => expect(bool(true) | 1).not.toBeInstanceOf(Boolean));
        toEqualAndBeVanillaAndBool(bool(true) | bool(true), true, 'assertIs(True | True, True)');
        
        toEqualAndBeVanillaAndBool(bool(true) ^ 1, 0, 'assertEqual(True ^ 1, 0)');
        test('(bool(true) ^ 1).not.toBeInstanceOf(Boolean)', () => expect(bool(true) ^ 1).not.toBeInstanceOf(Boolean));
        toEqualAndBeVanillaAndBool(bool(true) ^ bool(true), false, 'assertIs(True ^ True, false)');
        
        
    });
    describe.skip(`test_fileclosed`, () => {
        /*def test_fileclosed(self):
            try:
                f = open(support.TESTFN, "w")
                assertIs(f.closed, False)
                f.close()
                assertIs(f.closed, True)
            finally:
                os.remove(support.TESTFN)
        */
    });
    describe(`test_types`, () => {
        // types are always true.
        for (let t of [
            bool,
            complex,
            dict,
            float,
            int,
            list,
            object,
            set,
            str,
            tuple,
            type
        ]) {
            toEqualAndBeVanillaAndBool(bool(t), true, 'assertIs(bool(t), True)');
            
            
        }
    });
    describe.skip(`test_from_bytes`, () => {
    
    });
});
