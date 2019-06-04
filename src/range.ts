export function* range(start: any, stop: number): IterableIterator<any> {
    for (let i = start; i <= stop; i++)
        yield i;
    
}
