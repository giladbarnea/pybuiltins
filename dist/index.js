"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function any(collection) {
    return collection.some(item => bool(item));
}
exports.any = any;
function all(collection) {
    return collection.every(item => bool(item));
}
exports.all = all;
function bool(val) {
    /*
    |               | o instanceof Object   | typeof o == 'object'  |  !!o  |
    |  -----------  |  ------------------   |  -------------------  | ----- |
    |  {}           |         true          |         true          | true  |
    |  []           |         true          |         true          | true  |
    |  ()=>{}       |         true          |         false         | true  |
    |  new class{}  |         true          |         true          | true  |
    |  (()=>{})()   |         false         |         false         | false |
    |  0            |         false         |         false         | false |
    |  ""           |         false         |         false         | false |
    |  null         |         false         |         true          | false |
    |  undefined    |         false         |         false         | false |
    |  "0"          |         false         |         false         | true  |
    |  "foo"        |         false         |         false         | true  |
    */
    if (val == null)
        return false;
    const valType = typeof val;
    if (valType != 'object') {
        if (valType == 'function')
            return true;
        else
            return !!val;
    }
    return !val.isEmpty();
}
exports.bool = bool;
function enumerate(collection) {
    let entries = Object.entries(collection);
    entries.map(entry => entry[0] = entry[0].isdigit()
        ? int(entry[0])
        : entry[0]);
    return entries;
}
exports.enumerate = enumerate;
function float(str) {
    return parseFloat(str);
}
exports.float = float;
function int(num) {
    return Math.floor(num);
}
exports.int = int;
function sum(arr) {
    let sum = 0;
    let dirty = false;
    for (let v of arr) {
        let number = float(v);
        if (!isNaN(number)) {
            dirty = true;
            sum += number;
        }
    }
    return !dirty ? null : sum;
}
exports.sum = sum;
function max(...values) {
    return Math.max(...values);
}
exports.max = max;
function min(...values) {
    return Math.min(...values);
}
exports.min = min;
function* range(start, stop) {
    for (let i = start; i <= stop; i++)
        yield i;
}
exports.range = range;
function round(n, d = 0) {
    let fr = 10 ** d;
    return int(n * fr) / fr;
}
exports.round = round;
function str(val) {
    return val ? val.toString() : "";
}
exports.str = str;
function* zip(arr1, arr2) {
    for (let key in arr1)
        yield [arr1[key], arr2[key]];
}
exports.zip = zip;
