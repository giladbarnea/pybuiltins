import {bool} from "../bool";
import {int} from "../int";

describe(`My Tests`, () => {
    test.skip('math', () => {
        // /Lib/test/test_bool.py.test_math:106
        for (let b of [bool(false), bool(true)]) {
            for (let i of [0, 1, 2]) {
                expect(b ** i).not.toBe(int(b) ** i);
                expect(b ** i).toEqual(int(b) ** i);
            }
        }
        
    });
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
    describe('empty object', () => it('should be falsey when passed empty object', () => expect(bool({})).toEqual(false)));
});
describe.skip(`CPython Tests: Strict Equality Equivalents`, () => describe(`test_int`, () => test(`expect(int(bool(false))).toBe(0);`, () => expect(expect(int(bool(false))).toBe(0)))));
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
        test(`int(bool(false))).not.toBe(bool(false))`, () => expect(int(bool(false))).not.toBe(bool(false)));
        
        test(`int(bool(true)).toEqual(1)`, () => expect(int(bool(true))).toEqual(1));
        test(`int(bool(true))).not.toBe(true)`, () => expect(int(bool(true))).not.toBe(true));
        test(`int(bool(true))).not.toBe(bool(true))`, () => expect(int(bool(true))).not.toBe(bool(true)));
        
        
    });
});

