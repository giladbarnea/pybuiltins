import {int} from "../int";

/**\Lib\test\test_int.py*/
test('test_basic', () => {
    expect(int(314)).toEqual(314);
    expect(int(3.14)).toEqual(3);
});
/*const start = performance.now();
console.log({start});
for (let i of range(1000000)) {
    int(i)
}
const end = performance.now();
console.log({end});
console.log('end - start', end - start);
*/

