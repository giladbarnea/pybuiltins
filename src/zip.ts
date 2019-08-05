export function* zip(arr1: { [x: string]: any; }, arr2: { [x: string]: any; }): IterableIterator<any[]> {
    for (let key in arr1)
        yield [arr1[key], arr2[key]];
}
