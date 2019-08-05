/**
 * https://docs.python.org/3/library/functions.html#abs
 * Return the absolute value of a number.
 * The argument may be an integer or a floating point number.
 * If the argument is a complex number, its magnitude is returned.
 * */

export function abs(x) {
    const typeofX = typeof x;
    if (typeofX === 'object') { // [], {}, new class{}, null
        if (Array.isArray(x)) // []
            throw TypeError("bad operand type for abs(): 'object' (Array)");
        if (!(x instanceof Object)) // null
            throw TypeError("bad operand type for abs(): 'null'");
    }
    if (typeofX === 'string')
        throw TypeError("bad operand type for abs(): 'string'");
    if (typeofX === 'boolean')
        return x ? 1 : 0;
    return x < 0 ? -x : x;
}
