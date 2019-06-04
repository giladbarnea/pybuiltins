import {int} from "./int";

export function enumerate<T>(collection: T[] | T): [string[] | number[] | T[]] {
    let entries = Object.entries(collection);
    // @ts-ignore
    entries.map(entry => entry[0] = entry[0].isdigit()
        ? int(entry[0])
        : entry[0]);
    // @ts-ignore
    return entries;
}
