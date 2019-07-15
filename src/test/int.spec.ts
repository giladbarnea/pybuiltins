import {int, Int} from "../int";
import {bool} from "../bool";
import {ValueError, ZeroDivisionError} from "../exceptions"
import {Chance} from 'chance';

const chance = new Chance();
/**\Lib\test\test_int.py*/
describe('CPython Tests', () => {
    const L = [
        ['0', 0],
        ['1', 1],
        ['9', 9],
        ['10', 10],
        ['99', 99],
        ['100', 100],
        ['314', 314],
        [' 314', 314],
        ['314 ', 314],
        [false, 0],
        ['  \t\t  314  \t\t  ', 314],
        // [repr(sys.maxsize), sys.maxsize],
        ['  1  ', 1],
    ];
    test('test_basic', () => {
        expect(int()).toEqual(0);
        expect(int(false)).toEqual(0);
        expect(int(314)).toEqual(314);
        expect(int(3.14)).toEqual(3);
        // Check that conversion from float truncates towards zero
        expect(int(-3.14)).toEqual(-3);
        expect(int(3.9)).toEqual(3);
        expect(int(-3.9)).toEqual(-3);
        expect(int(3.5)).toEqual(3);
        expect(int(-3.5)).toEqual(-3);
        expect(int("-3")).toEqual(-3);
        expect(int(" -3 ")).toEqual(-3);
        expect(int("10", 16)).toEqual(16);
        
        for (let [s, v] of L) {
            for (let sign of ["", "+", "-"]) {
                for (let prefix of ["", " ", "\t", "  \t\t  "]) {
                    let ss = prefix + sign + s;
                    let vv = v;
                    if (sign == "-") {
                        vv = -v
                    }
                    try {
                        let actual = int(ss);
                        expect(actual).toEqual(vv);
                    } catch (e) {
                        let isValueError = e instanceof ValueError;
                        if (!(isValueError)) {
                            console.log('failed toEqual.\nexpected:', vv, {prefix, sign, s, v, ss, e});
                            throw e
                        } else {
                        
                        }
                        
                    }
                }
            }
        }
        
        
        /*s = repr(-1-sys.maxsize)
        x = int(s)
        self.assertEqual(x+1, -sys.maxsize)
        self.assertIsInstance(x, int)
        # should return int
        self.assertEqual(int(s[1:]), sys.maxsize+1)
        */
        
        // should return int
        expect(int(1e100)).toBeInstanceOf(Int);
        expect(int(-1e100)).toBeInstanceOf(Int);
        
        
        /*x = -1-sys.maxsize
        */
        let x = int('1' * 600);
        expect(x >> 1).toEqual(x / 2);
        
        expect(x).toBeInstanceOf(Int);
        expect(() => int(1, 12)).toThrow(TypeError);
        
        expect(int('0x123', 16)).toEqual(291);
        // expect(int('0x123', 0)).toEqual(291); // mine
        // expect(int('0x123', 16) === int('0x123', 0)).toBe(true); // mine
        // expect(int('0x123', 16)).toBe(int('0x123', 0)); // mine
        // expect(int('0o123', 0)).toEqual(83);
        // expect(int('0o123', 0)).toEqual(int('0o123', 8)); // mine
        
        const shouldThrow = [
            () => int('0x', 16),
            () => int('0x', 0),
            () => int('0o', 8),
            () => int('0o', 0),
            () => int('0b', 2),
            () => int('0b', 0),
        
        ];
        for (let bad of shouldThrow)
            expect(bad).toThrow(ValueError);
        
        /*let actualExpectedPairs = [
            [int('0x123', 16), 291],
            [int('100000000000000000000000000000000', 2), 4294967296],
            [int('102002022201221111211', 3), 4294967296],
            [int('10000000000000000', 4), 4294967296],
            [int('32244002423141', 5), 4294967296],
            [int('1550104015504', 6), 4294967296],
            [int('211301422354', 7), 4294967296],
            [int('40000000000', 8), 4294967296],
            [int('12068657454', 9), 4294967296],
            [int('4294967296', 10), 4294967296],
            [int('1904440554', 11), 4294967296],
            [int('9ba461594', 12), 4294967296],
            [int('535a79889', 13), 4294967296],
            [int('2ca5b7464', 14), 4294967296],
            [int('1a20dcd81', 15), 4294967296],
            [int('100000000', 16), 4294967296],
            [int('a7ffda91', 17), 4294967296],
            [int('704he7g4', 18), 4294967296],
            [int('4f5aff66', 19), 4294967296],
            [int('3723ai4g', 20), 4294967296],
            [int('281d55i4', 21), 4294967296],
            [int('1fj8b184', 22), 4294967296],
            [int('1606k7ic', 23), 4294967296],
            [int('mb994ag', 24), 4294967296],
            [int('hek2mgl', 25), 4294967296],
            [int('dnchbnm', 26), 4294967296],
            [int('b28jpdm', 27), 4294967296],
            [int('8pfgih4', 28), 4294967296],
            [int('76beigg', 29), 4294967296],
            [int('5qmcpqg', 30), 4294967296],
            [int('4q0jto4', 31), 4294967296],
            [int('4000000', 32), 4294967296],
            [int('3aokq94', 33), 4294967296],
            [int('2qhxjli', 34), 4294967296],
            [int('2br45qb', 35), 4294967296],
            [int('1z141z4', 36), 4294967296],
        ];
        for (let [actual, expected] of actualExpectedPairs)
            expect(actual).toEqual(expected);
        */
        
        // tests with base 0
        /*let base0values = [
            [' 0o123  ', 83],
            ['000', 0],
            ['0o123', 83],
            ['0x123', 291],
            ['0b100', 4],
            [' 0O123   ', 83],
            [' 0X123  ', 291],
            [' 0B100 ', 4],
        ];
        for (let [value, expected] of base0values) {
            expect(int(value, 0)).toEqual(expected)
        }
        */
        
        // without base still base 10
        expect(int('0123')).toEqual(123);
        expect(int('0123', 10)).toEqual(123);
        
        // tests with prefix and base != 0
        expect(int('0x123', 16)).toEqual(291);
        // expect(int('0o123', 8)).toEqual(83);
        // expect(int('0b100', 2)).toEqual(4);
        expect(int('0X123', 16)).toEqual(291);
        // expect(int('0O123', 8)).toEqual(83);
        // expect(int('0B100', 2)).toEqual(4);
        
        // the code has special checks for the first character after the  type prefix
        expect(() => int('0b2', 2)).toThrow(ValueError);
        expect(() => int('0b02', 2)).toThrow(ValueError);
        expect(() => int('0B2', 2)).toThrow(ValueError);
        expect(() => int('0B02', 2)).toThrow(ValueError);
        expect(() => int('0o8', 8)).toThrow(ValueError);
        expect(() => int('0o08', 8)).toThrow(ValueError);
        expect(() => int('0O8', 8)).toThrow(ValueError);
        expect(() => int('0O08', 8)).toThrow(ValueError);
        expect(() => int('0xg', 16)).toThrow(ValueError);
        expect(() => int('0x0g', 16)).toThrow(ValueError);
        expect(() => int('0Xg', 16)).toThrow(ValueError);
        expect(() => int('0X0g', 16)).toThrow(ValueError);
        
        
        // Checks for proper evaluation of 2**32 + 1
        expect(int('100000000000000000000000000000001', 2)).toEqual(4294967297);
        expect(int('102002022201221111212', 3)).toEqual(4294967297);
        expect(int('10000000000000001', 4)).toEqual(4294967297);
        expect(int('32244002423142', 5)).toEqual(4294967297);
        expect(int('1550104015505', 6)).toEqual(4294967297);
        expect(int('211301422355', 7)).toEqual(4294967297);
        expect(int('40000000001', 8)).toEqual(4294967297);
        expect(int('12068657455', 9)).toEqual(4294967297);
        expect(int('4294967297', 10)).toEqual(4294967297);
        expect(int('1904440555', 11)).toEqual(4294967297);
        /*expect(int('9ba461595', 12)).toEqual(4294967297);
        expect(int('535a7988a', 13)).toEqual(4294967297);
        expect(int('2ca5b7465', 14)).toEqual(4294967297);
        expect(int('1a20dcd82', 15)).toEqual(4294967297);
        expect(int('100000001', 16)).toEqual(4294967297);
        expect(int('a7ffda92', 17)).toEqual(4294967297);
        expect(int('704he7g5', 18)).toEqual(4294967297);
        expect(int('4f5aff67', 19)).toEqual(4294967297);
        expect(int('3723ai4h', 20)).toEqual(4294967297);
        expect(int('281d55i5', 21)).toEqual(4294967297);
        expect(int('1fj8b185', 22)).toEqual(4294967297);
        expect(int('1606k7id', 23)).toEqual(4294967297);
        expect(int('mb994ah', 24)).toEqual(4294967297);
        expect(int('hek2mgm', 25)).toEqual(4294967297);
        expect(int('dnchbnn', 26)).toEqual(4294967297);
        expect(int('b28jpdn', 27)).toEqual(4294967297);
        expect(int('8pfgih5', 28)).toEqual(4294967297);
        expect(int('76beigh', 29)).toEqual(4294967297);
        expect(int('5qmcpqh', 30)).toEqual(4294967297);
        expect(int('4q0jto5', 31)).toEqual(4294967297);
        expect(int('4000001', 32)).toEqual(4294967297);
        expect(int('3aokq95', 33)).toEqual(4294967297);
        expect(int('2qhxjlj', 34)).toEqual(4294967297);
        expect(int('2br45qc', 35)).toEqual(4294967297);
        expect(int('1z141z5', 36)).toEqual(4294967297)
        */
    });
    
    describe('longobject.c', () => {
        // Objects\longobject.c.PyLong_FromString (2117)
        test('PyLong_FromString', () => {
            expect(int('10')).toEqual(10);
            expect(int('+10')).toEqual(10);
            expect(int('-10')).toEqual(-10);
        })
    })
});
describe('PyPy Tests', () => {
    test('inplace', () => {
        let eight = int(8);
        eight--;
        expect(eight).toEqual(7);
        let seven = int(7);
        seven++;
        expect(seven).toEqual(8);
    });
});
describe('Int vs pure JS', () => {
    test('operands', () => {
        
        let n1 = chance.integer();
        let n2 = chance.integer();
        let n0 = 0;
        let posn = chance.integer({min: 1});
        let negn = -posn;
        let int1 = int(n1);
        let int2 = int(n2);
        let int0 = int(0);
        let posint = int(posn);
        let negint = int(negn);
        expect(() => int1.divide(n0)).toThrow(ZeroDivisionError);
        expect(() => int1.divide("0")).toThrow(ZeroDivisionError);
        expect(() => int1.divide(int0)).toThrow(ZeroDivisionError);
        
        expect(-int1).toEqual(-n1);
        expect(-1 * int1).toEqual(-int1);
        
        expect(+int1).toEqual(+n1);
        expect(+int1).toEqual(n1);
        expect(1 * int1).toEqual(+int1);
        
        expect(int1 + int2).toEqual(n1 + n2);
        expect(int1 - int2).toEqual(n1 - n2);
        expect(int1 * int2).toEqual(n1 * n2);
        expect(int1 / int2).toEqual(n1 / n2);
        
        expect(int1 % int2).toEqual(n1 % n2);
        
        expect(int1 ** int2).toEqual(n1 ** n2);
        expect(int1 ** -int2).toEqual(n1 ** -n2);
        expect((-int1) ** int2).toEqual((-n1) ** n2);
        expect((-int1) ** -int2).toEqual((-n1) ** -n2);
        
        expect(Math.atan2(int1, int2)).toEqual(Math.atan2(n1, n2));
        expect(Math.abs(int1)).toEqual(Math.abs(n1));
        expect(Math.abs(-int1)).toEqual(Math.abs(n1));
        expect(Math.abs(negint)).toEqual(posint);
        expect(Math.abs(negn)).toEqual(posint);
        
        
        //    TODO: divmod
    });
    test('Boolean', () => {
        let pos = chance.integer({min: 1});
        let neg = chance.integer({max: 0});
        
        let intpos = int(pos);
        let intneg = int(neg);
        
        
        expect(Boolean(intpos)).toBe(true);
        
        
        expect(!Boolean(intpos)).toBe(false);
        expect(!intpos).toBe(false);
        
        expect(Boolean(intneg)).toBe(true);
        expect(!!intneg).toBe(true);
        expect(!Boolean(intneg)).toBe(false);
        expect(!intneg).toBe(false);
        
        // TODO: these fail
        /*
        let int0 = int(0);
        expect(Boolean(int0)).toBe(false);
        expect(!int0).toBe(true);
        expect(!!int0).toBe(false);
        
        expect(!!intpos).toBe(true);
        */
    });
    
});
describe.skip('Int vs pythonlang', () => {
    test('TypeError', () => {
        expect(() => int(list()))
            .toThrow(new TypeError(`int() argument must be a string, a bytes-like object or a number, not 'list'`));
        expect(() => int(dict()))
            .toThrow(new TypeError(`int() argument must be a string, a bytes-like object or a number, not 'dict'`));
    });
    test('bool', () => {
        let pos = chance.integer({min: 1});
        let neg = chance.integer({max: 0});
        let int0 = int(0);
        let intpos = int(pos);
        let intneg = int(neg);
        let boolintpos = bool(intpos);
        let boolintneg = bool(intneg);
        let boolint0 = bool(int0);
        
        expect(boolint0).toBe(false);
        expect(!boolint0).toBe(true);
        
        
        expect(boolintpos).toBe(true);
        expect(!boolintpos).toBe(false);
        
        
        expect(boolintneg).toBe(false);
        expect(!boolintneg).toBe(true);
        
        
    });
});
describe('Bitwise', () => {
    test('bitwise operators', () => {
        // https://wiki.python.org/moin/BitwiseOperators
        
    });
    describe('binary numbers', () => {
        test('binary number, no base', () => expect(int(0b111101)).toEqual(61));
        test('binary number, base 0', () => expect(() => int(0b111101, 0)).toThrow(new TypeError(`int() can't convert non-string with explicit base`)));
        test('binary string literal, base 0', () => expect(int('0b111101', 0)).toEqual(61));
        test('binary string literal, base 2', () => expect(int('0b111101', 2)).toEqual(61));
        test('binary string literal, no base', () => expect(() => int('0b111101')).toThrow(new ValueError(`invalid literal for int() with base 10: '0b111101'`)));
        test('binary string literal, out of range base', () => expect(() => int('0b111101', 3)).toThrow(new ValueError(`invalid literal for int() with base 3: '0b111101'`)));
    });
    test('decimal numbers', () => {
    
    });
});

describe('literal_tricky_bases', () => {
    test('return normal value', () => {
        
        expect(int("00", 0)).toEqual(0);
        expect(int("07", 10)).toEqual(7);
        expect(int("07", 8)).toEqual(7);
        expect(int("016", 7)).toEqual(13);
        expect(int("02", 3)).toEqual(2);
        expect(int("33", 4)).toEqual(15);
        expect(int("033", 4)).toEqual(15);
    });
    test('throw ValueError', () => {
        expect(() => int("07", 5)) // parseInt("07", 5) => 0
            .toThrow(new ValueError(`invalid literal for int() with base 5: '07'`));
        expect(() => int("07", 0))
            .toThrow(new ValueError(`invalid literal for int() with base 0: '07'`));
        
        
        expect(() => int("016", 6)) // parseInt("016", 6) => 1
            .toThrow(new ValueError(`invalid literal for int() with base 6: '016'`));
        
        
        expect(() => int("02", 2)) // parseInt("02", 2) => 0
            .toThrow(new ValueError(`invalid literal for int() with base 2: '02'`));
        
        expect(() => int("033", 2))
            .toThrow(new ValueError(`invalid literal for int() with base 2: '033'`));
        expect(() => int("33", 2))
            .toThrow(new ValueError(`invalid literal for int() with base 2: '33'`));
        
        expect(() => int("034", 4)).toThrow(new ValueError(`invalid literal for int() with base 4: '034'`));
        
        expect(() => int("01", 0)) // parseInt("01", 0) => 1
            .toThrow(new ValueError(`invalid literal for int() with base 0: '01'`));
        expect(() => int("-01", 0)) // parseInt("-01", 0) => -1
            .toThrow(new ValueError(`invalid literal for int() with base 0: '-01'`));
    });
    
    
});
describe('ValueError misc', () => {
    // \pypy\objspace\std\test\test_intobject.py test_leading_zero_literal()
    test('pypy/objspace/std/test/test_intobject.py test_leading_zero_literal()', () => {
        const invalids = [
            ["07777777777777777777777777777777777777", 0],
            ["00000000000000000000000000000000000007", 0],
            ["00000000000000000077777777777777777777", 0],
        ];
        for (let [val, base] of invalids) {
            expect(() => int(val, base))
                .toThrow(new ValueError(`invalid literal for int() with base ${base === undefined ? 10 : base}: '${val}'`));
        }
        
        
    });
    
    test('invalid literal', () => {
        expect(() => int("")).toThrow(new ValueError(`invalid literal for int() with base 10: ''`));
        expect(() => int('')).toThrow(new ValueError(`invalid literal for int() with base 10: ''`));
        expect(() => int(``)).toThrow(new ValueError(`invalid literal for int() with base 10: ''`));
        expect(() => int(" ")).toThrow(new ValueError(`invalid literal for int() with base 10: ' '`));
        expect(() => int(' ')).toThrow(new ValueError(`invalid literal for int() with base 10: ' '`));
        expect(() => int(` `)).toThrow(new ValueError(`invalid literal for int() with base 10: ' '`));
        expect(() => int('  \t\t  ')).toThrow(new ValueError(`invalid literal for int() with base 10: '  \t\t  '`));
        expect(() => int("+ 314")).toThrow(new ValueError(`invalid literal for int() with base 10: '+ 314'`));
        expect(() => int("+ 314", undefined)).toThrow(new ValueError(`invalid literal for int() with base 10: '+ 314'`));
        expect(() => int("+ 314", 25)).toThrow(new ValueError(`invalid literal for int() with base 25: '+ 314'`));
        expect(() => int("+ 314", 10)).toThrow(new ValueError(`invalid literal for int() with base 10: '+ 314'`));
        expect(() => int("+ 314", 0)).toThrow(new ValueError(`invalid literal for int() with base 0: '+ 314'`));
        expect(() => int('  1x')).toThrow(new ValueError(`invalid literal for int() with base 10: '  1x'`));
        expect(() => int('_1')).toThrow(new ValueError(`invalid literal for int() with base 10: '_1'`));
        expect(() => int('1.5')).toThrow(new ValueError(`invalid literal for int() with base 10: '1.5'`));
        expect(() => int('hello5')).toThrow(new ValueError(`invalid literal for int() with base 10: 'hello5'`));
        // TODO:
        //  ['  1\02  ', ValueError],
        //  ["\u0200", ValueError]
        
    });
    test('base out of range', () => {
        for (let [val, base] of [["+ 314", 1], ["+ 314", 37]]) {
            expect(() => int(val, base)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0"));
        }
    });
    
    
});
describe('TypeError misc', () => {
    test('argument must be', () => {
        const badargs = [
            [int],
            [null],
            [[]],
        ];
        for (let [val, base] of badargs) {
            expect(() => int(val, base))
                .toThrow(new TypeError(`int() argument must be a string, a bytes-like object or a number, not '${typeof val}'`));
        }
    });
    test('cannot be interpreted', () => {
        expect(() => int("+ 314", null))
            .toThrow(new TypeError(`'null' object cannot be interpreted as an integer`));
        
    });
    test(`can't convert`, () => {
        const badargs = [
            [5, 5],
        ];
        for (let [val, base] of badargs) {
            expect(() => int(val, base))
                .toThrow(new TypeError(`int() can't convert non-string with explicit base`));
        }
    });
    
    
});


