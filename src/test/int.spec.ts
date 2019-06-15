import {int} from "../int";
import {ValueError} from "../exceptions"

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
/**\Lib\test\test_int.py*/
test('test_basic', () => {
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
    // Different base:
    expect(int("10", 16)).toEqual(16);
    // Test conversion from strings and various anomalies
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
    // @ts-ignore
    expect(int("01") + int("02")).toEqual(3)
    
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
describe('test_ValueError', () => {
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
        // TODO:
        //  ['  1\02  ', ValueError],
        //  ["\u0200", ValueError]
        const invalids = [
            [""],
            [''],
            [' '],
            [' '],
            ['  \t\t  '],
            ["+ 314",],
            ["+ 314"],
            ["+ 314", undefined],
            ["+ 314", 25],
            ["+ 314", 10],
            ["+ 314", 0],
            ['  1x']
        ];
        for (let [val, base] of invalids) {
            expect(() => int(val, base))
                .toThrow(new ValueError(`invalid literal for int() with base ${base === undefined ? 10 : base}: '${val}'`));
        }
    });
    test('base out of range', () => {
        for (let [val, base] of [["+ 314", 1], ["+ 314", 37]]) {
            expect(() => int(val, base)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0"));
        }
    });
    
    
});
describe('test_TypeError', () => {
    test('argument must be', () => {
        const badargs = [
            [int],
            [null],
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




