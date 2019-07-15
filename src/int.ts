import {ZeroDivisionError, ValueError} from "./exceptions"


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

/*const oldProto = Boolean.prototype;
Boolean = (val) => {
    console.log({val, 'val.valueOf()': val.valueOf()});
    if (val instanceof Int) {
        val = val.valueOf();
    }
    
    return !!(val);
};
Boolean.prototype = oldProto;
*/
/*const oldProto = Number.prototype;
Number = (val) => {
    console.log({val});
    return parseInt(val);
};
Number.prototype = oldProto;
*/

/*Object.defineProperty(Number.prototype, "valueOf", {
    value() {
        if (this instanceof Int) {
            console.log({'this': this});
            return this;
        }
        return this;
    }
});
*/

/*Object.defineProperty(Boolean.prototype, "valueOf", {
    value(arg, ...args) {
        console.log({arg, args});
    }
});
*/

export class Int extends Number {
    toString(radix?: number): string {
        let ret = super.toString(radix);
        console.log('toString, returning: ', ret);
        return ret
    }
    
    
    valueOf(): number {
        let ret = super.valueOf();
        // console.log('valueOf, returning: ', ret);
        return ret;
    }
    
    
    divide(y: Int | number) {
        
        if (y == 0) {
            throw new ZeroDivisionError("division by zero")
        } else {
            return this / y;
        }
    }
    
    
    constructor(x = undefined, base?: string | number | Function) {
        if (x === undefined || x === false) {
            super(0);
            return
        }
        const typeofx = typeof x;
        let errorIfNonZero = false;
        if (base === undefined) {
            base = 10;
        } else {
            if (base === null)
                throw new TypeError(`'null' object cannot be interpreted as an integer`);
            if (base != 0 && base < 2 || base > 36)
                throw new ValueError("int() base must be >= 2 and <= 36, or 0");
            // base was passed explicitly
            if (typeofx === 'number') {
                throw new TypeError(`int() can't convert non-string with explicit base`)
            }
        }
        
        const typeofbase = typeof base;
        
        
        if (typeofx !== 'number' && typeofx !== 'string')
            throw new TypeError(`int() argument must be a string, a bytes-like object or a number, not '${typeofx}'`);
        const isHexaDecimal = x[1] === 'x' || x[1] === 'X';
        const isOctal = x[1] === 'o' || x[1] === 'O';
        const isBinary = x[1] === 'b' || x[1] === 'B';
        const mod = x % 1;
        const isFloat = mod !== 0;
        if (typeofx === 'string') {
            if (isFloat || // int('1.5')
                !RegExp(/\d/).test(x) || // int("")
                isNaN(mod)) // int("+ 314")
                throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
        }
        
        
        if (typeofx === 'string') {
            for (let c of x) {
                if (c >= base && c != '0') { // int("07", 5)
                    throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
                }
            }
        }
        
        if (isFloat) {
            if (x < 0)
                super(Math.ceil(x));
            else
                super(Math.floor(x));
            return
        }
        if (base === 0) {
            // CPython Objects\longobject.c.PyLong_FromString (lineno 2144)
            if (x[0] !== '0') {
                base = 10;
            } else {
                if (isHexaDecimal) {
                    base = 16;
                } else {
                    if (isOctal) {
                        base = 8;
                    } else if (isBinary) {
                        base = 2;
                    } else {
                        /* "old" (C-style) octal literal, now invalid.
                        it might still be zero though */
                        errorIfNonZero = true;
                        base = 10;
                    }
                }
            }
        }
        if (x[0] === '0' && (
            (base === 16 && isHexaDecimal) ||
            (base === 8 && isOctal) ||
            (base === 2 && isBinary))) {
            x = x.slice(2);
            
        }
        if (base !== 10) {
            super(parseInt(x, <number>base));
        } else {
            super(x);
        }
    }
    
    
}

export function int(x = undefined, base?: string | number | Function): Int {
    return new Int(x, base)
}

// int('_1');
// let n1 = int(5);
// let n2 = int(10);
// let n0 = int(0);
// console.log('n0.valueOf(): ', n0.valueOf());
// console.log('n0.toString(): ', n0.toString());
// console.log('Boolean(n0): ', Boolean(n0));
// console.log("int('0x123', 16) ", int('0x123', 16));
// console.log("int('0x', 16) ", int('0x', 16));
