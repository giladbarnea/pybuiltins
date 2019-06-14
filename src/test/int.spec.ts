import {int} from "../int";
import {perf} from "../util";
import {range} from "../range";

/**\Lib\test\test_int.py*/
test('test_basic', () => {
    expect(int(314)).toEqual(314);
    expect(int(3.14)).toEqual(3);
});

test('constructor performance', () => {
    const tenkWholeNums = [];
    for(let i of range())
    perf.mark('start');
    
    expect(int(314)).toEqual(314);
    expect(int(3.14)).toEqual(3);
});
console.log('HI!!!');

