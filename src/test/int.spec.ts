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
    ['  \t\t  314  \t\t  ', 314],
    // [repr(sys.maxsize), sys.maxsize],
    // ['  1x', ValueError],
    ['  1  ', 1],
    // ['  1\02  ', ValueError],
    ['', ValueError],
    [' ', ValueError],
    ['  \t\t  ', ValueError],
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
                if (sign == "-" && v !== ValueError) {
                    vv = -v
                }
                let actual = int(ss);
                try {
                    expect(actual).toEqual(vv);
                    /*console.log('passed:', {
                        'int(ss)': actual,
                        vv, prefix, sign, s, v, ss
                    })
                    */
                } catch (e) {
                    if (!(e instanceof ValueError)) {
                        console.log('failed toEqual, actual:', actual,
                            'expected:', vv,
                            'vars:', {prefix, sign, s, v, ss});
                        throw e
                    } else {
                    
                    }
                    
                }
            }
        }
    }
    
});
test('test_ValueError', () => {
    expect(() => int("+ 314", 1)).toThrow(new ValueError("int() base must be >= 2 and <= 36, or 0"))
});
/** TODO this
 int("+ 314") => ValueError("invalid literal for int() with base 10: '+ 314'")
 int("+ 314", 7) => ValueError("invalid literal for int() with base 42: '+ 314'")
 int("+ 314", 1) => ValueError("int() base must be >= 2 and <= 36, or 0")
 int("+ 314", 37) => ValueError("int() base must be >= 2 and <= 36, or 0")
 int("+ 314", 0) => ValueError("invalid literal for int() with base 0: '+ 314'")
 
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


