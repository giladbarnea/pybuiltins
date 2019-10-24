function enumerate(obj: undefined): [void];
function enumerate(obj: null): never;
function enumerate<T>(obj: T[]): [number, T][];
function enumerate<T>(obj: T): [keyof T, T[keyof T]][];
function enumerate(obj) {
    if (obj === undefined)
        return [];
    if (obj === null)
        throw new TypeError('null is not iterable');
    let array = [];
    if (Array.isArray(obj) || typeof obj[Symbol.iterator] === 'function') {
        let i: number = 0;
        for (let x of obj) {
            array.push([i, x]);
            i++;
        }
    } else {
        for (let prop in obj) {
            array.push([prop, obj[prop]]);
        }
    }
    return array;
}
