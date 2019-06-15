import {ZeroDivisionError, ValueError} from "./exceptions"
import {StringOrNumber} from "./typings";


/**
 int([x]) -> integer
 int(x, base=10) -> integer
 
 Convert a number or string to an integer, or return 0 if no arguments
 are given.  If x is a number, return x.__int__().  For floating point
 numbers, this truncates towards zero.
 
 If x is not a number or if base is given, then x must be a string,
 bytes, or bytearray instance representing an integer literal in the
 given base.  The literal can be preceded by '+' or '-' and be surrounded
 by whitespace.  The base defaults to 10.  Valid bases are 0 and 2-36.
 Base 0 means to interpret the base from the string as an integer literal.
 >>> int('0b100', base=0)
 4
 
 */

const _Boolean = Boolean;
Boolean = (val) => {
    if (val instanceof Int)
        val = +val;
    
    return _Boolean(val);
};


class Int extends Number {
    
    
    /*valueOf(): number {
        console.log('Int valueOf', {
            this: this,
            'super.valueOf()': super.valueOf()
        });
        return +super.valueOf()
    }
    */
    
    divide(y: Int | number) {
        
        if (y == 0) {
            throw new ZeroDivisionError("division by zero")
        } else {
            return this / y;
        }
    }
    
    constructor(x, base?: StringOrNumber | Function) {
        /**Lib\test\test_int.py test_error_message().check()
         Objects\longobject.c:4818*/
        const typeofx = typeof x;
        if (base === undefined) {
            base = 10;
        } else {
            // base was passed explicitly
            if (typeofx === 'number') {
                throw new TypeError(`int() can't convert non-string with explicit base`)
            }
        }
        const typeofbase = typeof base;
        if (base === null)
            throw new TypeError(`'null' object cannot be interpreted as an integer`);
        if ((base < 2 || base > 36) && base != 0)
            throw new ValueError("int() base must be >= 2 and <= 36, or 0");
        
        if (typeofx !== 'number' && typeofx !== 'string')
            throw new TypeError(`int() argument must be a string, a bytes-like object or a number, not '${typeofx}'`);
        if (!RegExp(/\d/).test(x))
            throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
        
        const mod = x % 1;
        if (isNaN(mod))
            throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
        if (typeofx === 'string') {
            for (let c of x) {
                if (c >= base && c != 0) {
                    throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
                }
            }
        }
        
        if (mod != 0)
            if (x < 0)
                super(Math.ceil(x));
            else
                super(Math.floor(x));
        else if (base != 10)
            super(parseInt(x, <number>base));
        else
            super(x);
    }
}

export function int(x, base?: StringOrNumber | Function): Int {
    return new Int(x, base)
}
