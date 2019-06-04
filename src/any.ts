import {bool} from "./bool";

export function any(collection): boolean {
    return collection.some(item => bool(item));
}
