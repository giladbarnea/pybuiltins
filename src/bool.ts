import {cc} from "./util";
import {Int} from "./int";

class Bool extends Boolean {
    constructor(val: any, options = {}) {
        const {log} = options;
        if (log) console.log(cc('black', 'constructor'), {val});
        if (val === null) {
            super(false);
            if (log) console.log(cc('bright magenta', `super(false) and return. this: ${this}`));
            return;
        }
        const typeofval = typeof val;
        if (log) console.log(cc('blue', `typeofval: "${typeofval}"`));
        if (typeofval !== 'object') {
            if (log) console.log(cc('blue', `typeofval !== "object"`));
            if (typeofval === 'function') {
                super(true);
                if (log) console.log(cc('bright magenta', `typeofval === "function", super(true) and return. this: ${this}`));
            } else {
                super(!!val);
                if (log) console.log(cc('bright magenta', `typeofval !== "function", super(!!val) and return. this: ${this}`));
            }
            return;
        }
        super(Object.keys(val).length !== 0);
        if (log) console.log(cc('bright magenta', `super(Object.keys(val).length !== 0). this: ${this}`));
    }
}

export function bool(val: any, options = {}): boolean {
    
    /*if (val === null)
        return false;
    const typeofval = typeof val;
    if (typeofval !== 'object') {
        if (typeofval === 'function')
            return true;
        else
            return !!val;
    }
    return Object.keys(val).length !== 0;
    */
    const {log} = options;
    const newbool = new Bool(val, options);
    if (log) console.log(cc('bright magenta', `returning newbool:`), newbool);
    const ret = Boolean(newbool);
    return newbool;
}
