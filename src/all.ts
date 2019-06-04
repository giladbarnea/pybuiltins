import {bool} from "./bool";

export function all(collection): boolean {
    return collection.every(item => bool(item));
}
