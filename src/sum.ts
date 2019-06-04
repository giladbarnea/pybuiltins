import {float} from "./float";

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
