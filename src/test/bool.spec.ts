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
    const call = stack.find(x => x.includes('Suite.describe'));
    const lineno = call.substr(call.indexOf('bool.spec.ts') + 13);
    return `(${lineno}`;
}

function _toEqualAndBe(actual, expected, description = undefined, options: TestOptions & { vanilla: boolean }) {
    
    
    let {vanilla, not, skip, log} = options;
    const toWhat = vanilla ? `${expected}` : `bool(${expected}) = ${bool(expected)}`;
    if (!vanilla)
        expected = bool(expected, log);
    
    const tests = () => {
        const _name = (verb: Verb) => `expect(${actual})${not ? '.not' : ''}.to${verb}(${toWhat})`;
        let _test;
        if (skip) {
            _test = (verb: Verb, fn) => test.skip(_name(verb), fn(verb));
        } else {
            _test = (verb: Verb, fn) => test(_name(verb), fn(verb));
        }
        
        let fn;
        if (not) {
            fn = (verb: Verb) => () => expect(actual).not[`to${verb}`](expected);
        } else {
            fn = (verb: Verb) => () => expect(actual)[`to${verb}`](expected);
        }
        
        _test('Be', fn);
        _test('Equal', fn);
        
    };
    if (description) {
        
        // description = `${_suiteLineno()} ${description}`;
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
        // description = `${_suiteLineno()} ${description}`;
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
        
        // Both fail when returning new Bool
        // only toBe fails when returning Boolean(new Bool)
        toEqualAndBeVanilla(int(bool(true)), 1, 'assertEqual(int(True), 1)');
        
        not.toEqualAndBeVanillaAndBool(int(bool(true)), true, 'assertIsNot(int(True), True)')
        
    });
    describe.skip(`test_float`, () => {
    
    });
    describe('test_math', () => {
        
        describe(`${_suiteLineno()} line 55`, () => {
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(+bool(false), 0, '[0] assertEqual(+False, 0)');
            not.toEqualAndBeVanillaAndBool(+bool(false), bool(false), '[1] assertIsNot(+False, False)');
            
            // fails because -0 is not 0 in javascript
            skip.toEqualAndBeVanilla(-bool(false), 0, '[2] assertEqual(-False, 0)');
            
            not.toEqualAndBeVanillaAndBool(-bool(false), bool(false), '[3] assertIsNot(-False, False)');
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(Math.abs(bool(false)), 0, '[4] assertEqual(abs(False), 0)');
            not.toEqualAndBeVanillaAndBool(Math.abs(bool(false)), bool(false), '[5] assertIsNot(abs(False), False)');
            toEqualAndBeVanilla(+bool(true), 1, '[6] assertEqual(+True, 1)');
            not.toEqualAndBeVanillaAndBool(+bool(true), bool(true), '[7] assertIsNot(+True, True)');
            toEqualAndBeVanilla(-bool(true), -1, '[8] assertEqual(-True, -1)');
            toEqualAndBeVanilla(Math.abs(bool(true)), 1, '[9] assertEqual(abs(True), 1)');
            not.toEqualAndBeVanillaAndBool(Math.abs(bool(true)), bool(true), '[10] assertIsNot(abs(True), True)');
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(~bool(false), -1, '[11] assertEqual(~False, -1)');
            toEqualAndBeVanilla(~bool(true), -2, '[12] assertEqual(~True, -2)');
            
        });
        describe(`${_suiteLineno()} line 69`, () => {
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(bool(false) + 2, 2, '[0] assertEqual(False+2, 2)');
            toEqualAndBeVanilla(bool(true) + 2, 3, '[1] assertEqual(True+2, 3)');
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(2 + bool(false), 2, '[2] assertEqual(2+False, 2)');
            toEqualAndBeVanilla(2 + bool(true), 3, '[3] assertEqual(2+True, 3)')
        });
        
        describe(`${_suiteLineno()} line 74`, () => {
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(bool(false) + bool(false), 0, '[0] assertEqual(False+False, 0)');
            not.toEqualAndBeVanillaAndBool(bool(false) + bool(false), false, '[1] assertIsNot(False+False, False)');
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(bool(false) + bool(true), 1, '[2] assertEqual(False+True, 1)');
            not.toEqualAndBeVanillaAndBool(bool(false) + bool(true), true, '[3] assertIsNot(False+True, True)');
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(bool(true) + bool(false), 1, '[4] assertEqual(True+False, 1)');
            not.toEqualAndBeVanillaAndBool(bool(true) + bool(false), true, '[5] assertIsNot(True+False, True)');
            toEqualAndBeVanilla(bool(true) + bool(true), 2, '[6] assertEqual(True+True, 2)');
        });
        
        describe(`${_suiteLineno()} line 82`, () => {
            toEqualAndBeVanilla(bool(true) - bool(true), 0, '[0] assertEqual(True-True, 0)');
            not.toEqualAndBeVanillaAndBool(bool(true) - bool(true), false, '[1] assertIsNot(True-True, False)');
            toEqualAndBeVanilla(bool(false) - bool(false), 0, '[2] assertEqual(False-False, 0)');
            not.toEqualAndBeVanillaAndBool(bool(false) - bool(false), false, '[3] assertIsNot(False-False, False)');
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(bool(true) - bool(false), 1, '[4] assertEqual(True-False, 1)');
            not.toEqualAndBeVanillaAndBool(bool(true) - bool(false), true, '[5] assertIsNot(True-False, True)');
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(bool(false) - bool(true), -1, '[6] assertEqual(False-True, -1)');
        });
        
        
        describe(`${_suiteLineno()} line 90`, () => {
            toEqualAndBeVanilla(bool(true) * 1, 1, '[0] assertEqual(True*1, 1)');
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(bool(false) * 1, 0, '[1] assertEqual(False*1, 0)');
            not.toEqualAndBeVanillaAndBool(bool(false) * 1, false, '[2] assertIsNot(False*1, False)');
        });
        
        
        describe(`${_suiteLineno()} line 94`, () => {
            toEqualAndBeVanilla(bool(true) / 1, 1, '[0] assertEqual(True/1, 1)');
            not.toEqualAndBeVanillaAndBool(bool(true) / 1, true, '[1] assertIsNot(True/1, True)');
            
            // Boolean  toEqual fail
            //          toBe    fail
            toEqualAndBeVanilla(bool(false) / 1, 0, '[2] assertEqual(False/1, 0)');
            not.toEqualAndBeVanillaAndBool(bool(false) / 1, false, '[3] assertIsNot(False/1, False)');
        });
        
        
        describe(`${_suiteLineno()} line 99`, () => {
            toEqualAndBeVanilla(bool(true) % 1, 0, '[0] assertEqual(True%1, 0)');
            not.toEqualAndBeVanillaAndBool(bool(true) % 2, false, '[1] assertIsNot(True%1, False)');
            toEqualAndBeVanilla(bool(true) % 2, 1, '[2] assertEqual(True%2, 1)');
            not.toEqualAndBeVanillaAndBool(bool(true) % 2, true, '[3] assertIsNot(True%2, True)');
            toEqualAndBeVanilla(bool(false) % 1, 0, '[4] assertEqual(False%1, 0)');
            not.toEqualAndBeVanillaAndBool(bool(false) % 1, false, '[5] assertIsNot(False%1, False)');
        });
        
        describe(`${_suiteLineno()} for bool(false), bool(true)... i of [0,1,2]`, () => {
            
            // /Lib/test/test_bool.py.test_math:106
            for (let b of [bool(false), bool(true)]) {
                for (let i of [0, 1, 2]) {
                    let actual = b ** i;
                    let expected = int(b) ** i;
                    not.toEqualAndBeBool(actual, bool(expected), `[0] assertIsNot(${b}**${i}, bool(int(${b})**${i}))`);
                    
                    // new Bool toEqual b:true, i:1,2 fail
                    //          toBe    b:true, i:1,2 fail
                    toEqualAndBeVanilla(actual, expected, `[1] assertEqual(${b}**${i}, int(${b})**${i})`);
                }
            }
        });
        describe(`${_suiteLineno()} for bool(false), bool(true) x2`, () => {
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
                    // Boolean fail, new Bool fail, bool fail
                    describe(`${_suiteLineno()} assertIs(a&b, bool(int(a)&int(b)))`, () => {
                        test(`expect(${a} & ${b} = ${a & b}).toEqual(bool(int(${a}) & int(${b})) = ${bool_int_a_amp_int_b})`,
                            () => expect(a & b).toEqual(bool_int_a_amp_int_b));
                        test(`expect(${a} & ${b} = ${a & b}).toBe(bool(int(${a}) & int(${b})) = ${bool_int_a_amp_int_b})`,
                            () => expect(a & b).toBe(bool_int_a_amp_int_b));
                    });
                    // Boolean fail, new Bool fail, bool fail
                    describe(`${_suiteLineno()} assertIs(a|b, bool(int(a)|int(b)))`, () => {
                        
                        test(`expect(${a} | ${b} = ${a | b}).toEqual(bool(int(${a}) | int(${b})) = ${bool_int_a_pipe_int_b})`,
                            () => expect(a | b).toEqual(bool_int_a_pipe_int_b));
                        test(`expect(${a} | ${b} = ${a | b}).toBe(bool(int(${a}) | int(${b})) = ${bool_int_a_pipe_int_b})`,
                            () => expect(a | b).toBe(bool_int_a_pipe_int_b));
                    });
                    // Boolean fail, new Bool fail, bool fail
                    describe(`${_suiteLineno()} assertIs(a^b, bool(int(a)^int(b)))`, () => {
                        test(`expect(${a} ^ ${b} = ${a ^ b}).toEqual(bool(int(${a}) ^ int(${b})) = ${bool_int_a_hat_int_b})`,
                            () => expect(a ^ b).toEqual(bool_int_a_hat_int_b));
                        test(`expect(${a} ^ ${b} = ${a ^ b}).toBe(bool(int(${a}) ^ int(${b})) = ${bool_int_a_hat_int_b})`,
                            () => expect(a ^ b).toBe(bool_int_a_hat_int_b));
                    });
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
        });
        
        // line 129
        describe(`${_suiteLineno()} line 129`, () => {
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(1 == 1, true, '[0] assertIs(1==1, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(1 == 0, false, '[1] assertIs(1==0, False)');
            
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(0 < 1, true, '[2] assertIs(0<1, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(1 < 0, false, '[3] assertIs(1<0, False)');
            
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(0 <= 0, true, '[4] assertIs(0<=0, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(1 <= 0, false, '[5] assertIs(1<=0, False)');
            
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(1 > 0, true, '[6] assertIs(1>0, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(1 > 1, false, '[7] assertIs(1>1, False)');
            
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(1 >= 1, true, '[8] assertIs(1>=1, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(0 >= 1, false, '[9] assertIs(0>=1, False)');
            
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(0 != 1, true, '[10] assertIs(0!=1, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(0 != 0, false, '[11] assertIs(0!=0, False)');
        });
        
        let list = [1];
        describe(`${_suiteLineno()} line 142`, () => {
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(Object.is(list, list), true, '[0] assertIs(x is x, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(!Object.is(list, list), false, '[1] assertIs(x is not x, False)');
            
        });
        describe(`${_suiteLineno()} line 146`, () => {
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(list.includes(1), true, '[0] assertIs(1 in x, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(list.includes(0), false, '[1] assertIs(0 in x, False)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(!list.includes(1), false, '[2] assertIs(1 not in x, False)');
            
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(!list.includes(0), true, '[3] assertIs(0 not in list, True)');
            
        });
        let obj = {1: 2};
        // TODO: obj === obj?
        describe(`${_suiteLineno()} line 152`, () => {
            // new Bool toBe(bool(true))         fail
            toEqualAndBeVanillaAndBool(Object.is(obj, obj), true, '[0] assertIs(obj is obj, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))         fail
            toEqualAndBeVanillaAndBool(!Object.is(obj, obj), false, '[1] assertIs(obj is not obj, False)');
            
        });
        describe(`${_suiteLineno()} line 155`, () => {
            // new Bool toBe(bool(true))    fail
            toEqualAndBeVanillaAndBool((1 in obj), true, '[0] assertIs(1 in obj, True)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))    fail
            toEqualAndBeVanillaAndBool((0 in obj), false, '[1] assertIs(0 in obj, False)');
            
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))    fail
            toEqualAndBeVanillaAndBool(!(1 in obj), false, '[2] assertIs(1 not in obj, False)');
            
            // new Bool toBe(bool(true))    fail
            toEqualAndBeVanillaAndBool(!(0 in obj), true, '[3] assertIs(0 not in obj, True)');
            
        });
        describe(`${_suiteLineno()} line 160`, () => {
            // Boolean  toBe(bool(false))        fail
            //          toEqual(bool(false))     fail
            // new Bool toBe(bool(false))    fail
            toEqualAndBeVanillaAndBool(!bool(true), false, '[0] assertIs(not True, False)');
            // Boolean fail x4
            //  new Bool fail x4    WEIRD
            let b = bool(false, {log: true});
            let actual = !b;
            console.log(cc('blue', `b: ${b}, actual (!b): ${actual}`));
            toEqualAndBeVanillaAndBool(actual, true, '[1] assertIs(not False, True)');
        });
        
        
    });
    describe(`test_convert`, () => {
        // (,,'assertRaises(TypeError, bool, 42, 42)');
        test('bool(42, 42) TypeError', () => expect(bool(42, 42)).toThrow(new TypeError(`bool() takes at most 1 argument (2 given)`)));
        toEqualAndBeVanillaAndBool(bool(10), true, '[0] assertIs(bool(10), True)');
        toEqualAndBeVanillaAndBool(bool(1), true, '[1] assertIs(bool(1), True)');
        toEqualAndBeVanillaAndBool(bool(-1), true, '[2] assertIs(bool(-1), True)');
        toEqualAndBeVanillaAndBool(bool(0), false, '[3] assertIs(bool(0), False)');
        toEqualAndBeVanillaAndBool(bool("hello"), true, '[4] assertIs(bool("hello"), True)');
        toEqualAndBeVanillaAndBool(bool(""), false, '[5] assertIs(bool(""), False)');
        toEqualAndBeVanillaAndBool(bool(), false, '[6] assertIs(bool(), False)');
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
        toEqualAndBeVanillaAndBool(1 in {}, false, '[0] assertIs(1 in {}, False)');
        toEqualAndBeVanillaAndBool(1 in {1: 1}, true, '[1] assertIs(1 in {1:1}, True)');
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
    // TODO: all besides not instanceof fail
    describe(`test_boolean`, () => {
        // bool toBe(bool(1))       fail
        //      toEqual(bool(1))    fail
        toEqualAndBeVanillaAndBool(bool(true) & 1, 1, 'assertEqual(True & 1, 1)');
        
        test('(bool(true) & 1).not.toBeInstanceOf(Boolean)', () => expect(bool(true) & 1).not.toBeInstanceOf(Boolean));
        
        // bool toBe(true)          fail
        //      toEqual(true)       fail
        //      toBe(bool(true))    fail
        //      toEqual(bool(true)) fail
        toEqualAndBeVanillaAndBool(bool(true) & bool(true), true, 'assertIs(True & True, True)');
        
        // bool toBe(bool(1))       fail
        //      toEqual(bool(1))    fail
        toEqualAndBeVanillaAndBool(bool(true) | 1, 1, 'assertEqual(True | 1, 1)');
        
        test('(bool(true) | 1).not.toBeInstanceOf(Boolean)', () => expect(bool(true) | 1).not.toBeInstanceOf(Boolean));
        
        // bool toBe(true)          fail
        //      toEqual(true)       fail
        //      toBe(bool(true))    fail
        //      toEqual(bool(true)) fail
        toEqualAndBeVanillaAndBool(bool(true) | bool(true), true, 'assertIs(True | True, True)');
        
        // bool toBe(bool(1))       fail
        //      toEqual(bool(1))    fail
        toEqualAndBeVanillaAndBool(bool(true) ^ 1, 0, 'assertEqual(True ^ 1, 0)');
        
        test('(bool(true) ^ 1).not.toBeInstanceOf(Boolean)', () => expect(bool(true) ^ 1).not.toBeInstanceOf(Boolean));
        
        // bool toBe(true)          fail
        //      toEqual(true)       fail
        //      toBe(bool(true))    fail
        //      toEqual(bool(true)) fail
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
