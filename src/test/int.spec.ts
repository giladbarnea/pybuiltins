import {int} from "../int";
import {performance} from "perf_hooks"
import {range} from "../range"

/**\Lib\test\test_int.py*/
test('test_basic', () => {
    expect(int(314)).toEqual(314);
    expect(int(3.14)).toEqual(3);
    expect(int(-3.14)).toEqual(-3);
    expect(int(3.9)).toEqual(3);
    expect(int(-3.9)).toEqual(-3);
    expect(int(3.5)).toEqual(3);
    expect(int(-3.5)).toEqual(-3);
    expect(int("-3")).toEqual(-3);
    expect(int(" -3 ")).toEqual(-3);
    expect(int("10", 16)).toEqual(16);
});
const start = performance.now();
console.log({start});
for (let i of range(1000000)) {
    int(i)
}
const end = performance.now();
console.log({end});
console.log('end - start', end - start);


