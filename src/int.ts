import {ValueError} from "./exceptions"
import {StringOrNumber} from "./mytypes";


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

class Int extends Number {
    constructor(x, base: StringOrNumber | Function = 10) {
        /**Lib\test\test_int.py test_error_message().check()
         Objects\longobject.c:4818*/
        if ((base < 2 || base > 36) && base != 0)
            throw new ValueError("int() base must be >= 2 and <= 36, or 0");
        if (!RegExp(/\d/).test(x))
            throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
        const mod = x % 1;
        if (isNaN(mod))
            throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
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

export function int(x, base: StringOrNumber | Function = 10): Int {
    return new Int(x, base)
}
