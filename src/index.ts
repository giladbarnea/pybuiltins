export function any(collection): boolean {
    return collection.some(item => bool(item));
}

export function all(collection): boolean {
    return collection.every(item => bool(item));
}

export function bool(val: any): boolean {
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
    return Object.keys(val).length != 0;
    
}

export function enumerate<T>(collection: T[] | T): [string[] | number[] | T[]] {
    let entries = Object.entries(collection);
    // @ts-ignore
    entries.map(entry => entry[0] = entry[0].isdigit()
        ? int(entry[0])
        : entry[0]);
    // @ts-ignore
    return entries;
}

export function float(str: string): number {
    return parseFloat(str);
}


export function int(num): number {
    return Math.floor(num);
}

export function sum(arr: any[]): number {
    let sum = 0;
    let dirty = false;
    for (let v of arr) {
        let number = float(v);
        if (!isNaN(number)) {
            dirty = true;
            sum += number;
        }
        
    }
    // @ts-ignore
    return !dirty ? null : sum;
}

export function max(...values: number[]): number {
    return Math.max(...values);
}

export function min(...values: number[]): number {
    return Math.min(...values);
}

export function* range(start: any, stop: number): IterableIterator<any> {
    for (let i = start; i <= stop; i++)
        yield i;
    
}


export function round(n: number, d: number = 0): number {
    let fr = 10 ** d;
    return int(n * fr) / fr;
}

export function str(val): void | "" {
    return val ? val.toString() : "";
}


export function* zip(arr1: { [x: string]: any; }, arr2: { [x: string]: any; }): IterableIterator<any[]> {
    for (let key in arr1)
        yield [arr1[key], arr2[key]];
}
