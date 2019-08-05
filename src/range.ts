/**
 range(stop) -> range object
 range(start, stop[, step]) -> range object
 
 Return an object that produces a sequence of integers from start (inclusive)
 to stop (exclusive) by step.  range(i, j) produces i, i+1, i+2, ..., j-1.
 start defaults to 0, and stop is omitted!  range(4) produces 0, 1, 2, 3.
 These are exactly the valid indices for a list of 4 elements.
 When step is given, it specifies the increment (or decrement).
 */
export function* range(arg: number, ...args: number[]): IterableIterator<any> {
    const argsLen = args.length;
    
    let start;
    let stop;
    let step = 1;
    if (argsLen == 0) {
        start = 0;
        stop = arg;
    } else if (argsLen == 1) {
        start = arg;
        stop = args[0];
    } else if (argsLen == 2) {
        start = arg;
        stop = args[0];
        step = args[1];
    } else {
        throw new TypeError(`range expected at most 3 arguments, got ${argsLen + 1}`)
    }
    for (let i = start; i < stop; i += step)
        yield i;
    
}


