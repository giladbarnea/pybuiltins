export declare function bool(val: any): boolean;
export declare function enumerate<T>(collection: T[] | T): [string[] | number[] | T[]];
export declare function float(str: string): number;
export declare function int(num: string | number): number;
export declare function sum(arr: any[]): number;
export declare function max(...values: number[]): number;
export declare function min(...values: number[]): number;
export declare function range(start: any, stop: number): IterableIterator<any>;
export declare function round(n: number, d?: number): number;
export declare function str(val: {
    toString: () => void;
}): void | "";
export declare function zip(arr1: {
    [x: string]: any;
}, arr2: {
    [x: string]: any;
}): IterableIterator<any[]>;
