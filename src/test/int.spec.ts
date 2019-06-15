import {int} from "../int";
import {performance} from "perf_hooks"
import {range} from "../range"
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
    // ['  1x', ValueError],
    ['  1  ', 1],
    // ['  1\02  ', ValueError],
    // ["\u0200", ValueError]
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
                    /*console.log('passed:', {
                        'int(ss)': actual,
                        vv, prefix, sign, s, v, ss
                    })
                    */
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
    
});
describe('test_ValueError', () => {
    test('invalid literal', () => {
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
            ["+ 314", 0]
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
    // TODO:
    //  ['  1x', ValueError],
    //  ['  1\02  ', ValueError],
    //  ["\u0200", ValueError]
    
});

/** TODO
 int(5, 5) => TypeError("int() can't convert non-stirng with explicit base")
 int(null) => TypeError("int() argument must be a string, a bytes-like object or a number, not 'NoneType'")
 int(int) => TypeError("int() argument must be a string, a bytes-like object or a number, not 'type'")
 int("+ 314", null) => TypeError("'NoneType' object cannot be interpreted as an integer")
 */
/*const start = performance.now();
console.log({start});
for (let i of range(1000000)) {
    int(i)
}
const end = performance.now();
console.log({end});
console.log('end - start', end - start);
*/


