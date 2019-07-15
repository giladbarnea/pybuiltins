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
function extendConsole() {
    const reset = '\x1b[0m';
    const colors = {
        cyan: '\x1b[36m',
        yellow: '\x1b[33m',
        bright: '\x1b[1m',
        dim: '\x1b[2m',
        underscore: '\x1b[4m',
        blink: '\x1b[5m',
        reverse: '\x1b[7m',
        hidden: '\x1b[8m',
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        white: '\x1b[37m',
        bgblack: '\x1b[40m',
        bgred: '\x1b[41m',
        bggreen: '\x1b[42m',
        bgyellow: '\x1b[43m',
        bgblue: '\x1b[44m',
        bgmagenta: '\x1b[45m',
        bgcyan: '\x1b[46m',
        bgwhite: '\x1b[47m'
    };
    for (let [k, v] of Object.entries(colors)) {
        console[k] = (...args) => console.log(`${v}${args}${reset}`)
    }
}

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
    
    
    constructor(x = undefined, base?: string | number | Function, log?: boolean) {
        if (log) {
            extendConsole();
            console.bgcyan(`constructor, x: ${x}, base: ${base}`)
        }
        
        if (x === undefined || x === false) {
            if (log) console.log('x is undefined or false, super(0) return');
            super(0);
            return
        }
        const typeofx = typeof x;
        let errorIfNonZero = false;
        if (base === undefined) {
            if (log) console.log('base === undefined, base=10');
            base = 10;
        } else {
            if (base === null) {
                if (log) console.log('base ===, TypeError');
                throw new TypeError(`'null' object cannot be interpreted as an integer`);
            }
            if (base !== 0 && base < 2 || base > 36) {
                if (log) console.log('base out of range, ValueError');
                throw new ValueError("int() base must be >= 2 and <= 36, or 0");
            }
            // base was passed explicitly
            if (typeofx === 'number') {
                if (log) console.log('x is number, TypeError');
                throw new TypeError(`int() can't convert non-string with explicit base`)
            }
        }
        
        const typeofbase = typeof base;
        
        
        if (typeofx !== 'number' && typeofx !== 'string') {
            if (log) console.log('typeof x isnt number or string, TypeError');
            throw new TypeError(`int() argument must be a string, a bytes-like object or a number, not '${typeofx}'`);
        }
        const orig = x;
        let sign = undefined;
        let nosign = x;
        try {
            x = x.trim(); // "  +314 " => "+314"
            if (log && orig !== x) console.log(`after x.trim(): '${x}'`);
            if (x[0] === '-' || x[0] === '+') {
                sign = x[0] === '-' ? -1 : 1;
                nosign = x.slice(1);
                if (log) console.log(`x[0] is '${x[0]}', sign is: ${sign}', nosign is: '${nosign}'`);
            }
        } catch (e) {
            // may not be string
        }
        const letter = nosign[1];
        const isBinary = letter === 'b' || letter === 'B';
        const isOctal = letter === 'o' || letter === 'O';
        const isHexaDecimal = letter === 'x' || letter === 'X';
        const isSpecial = isBinary || isOctal || isHexaDecimal;
        const specialBase = isBinary ? 2 : isOctal ? 8 : isHexaDecimal ? 16 : undefined;
        const mod = x % 1;
        const isFloat = mod !== 0;
        if (typeofx === 'string') {
            if (log) console.log('typeof x === string');
            if (isFloat || // int('1.5')
                !RegExp(/\d/).test(x) || // int("")
                isNaN(mod)) { // int("+ 314")
                if (log) console.log(`'${x}' is float or !RegExp or ${x}%1 isNaN, ValueError`);
                throw new ValueError(`invalid literal for int() with base ${base}: '${orig}'`);
            }
            if (base === 0) {
                if (log) console.log('base === 0');
                if (isSpecial) {
                    if (log) console.log(`isSpecial, base=${specialBase}`);
                    base = specialBase;
                } else {
                    if (log) console.log('not isSpecial');
                    if (nosign[0] !== '0') {
                        if (log) console.log(`nosign[0] !== '0', base=10`);
                        base = 10;
                    } else {
                        if (log) console.log(`nosign[0] === '0', base=10`);
                        
                    }
                }
            }
            
            
            if (base !== specialBase) {
                if (log) console.log(`base !== specialBase (${base} !== ${specialBase})`);
                /**
                 * We don't want to check specials with matching base (ie bin:2, oct:8, hex: 16).
                 * When special and base matches, base === specialBase.
                 * Same for special with base 0.
                 * */
                // specialBase may be undefined if not special
                // otherwise int('0x123', 16) throws
                for (let c of x) {
                    let convertedC;
                    if (RegExp(/[a-zA-Z]/).test(c)) {
                        convertedC = parseInt(c, 36);
                        if (log) console.log(`in for loop, converted '${c}' to: ${convertedC}`);
                    } else {
                        convertedC = c;
                    }
                    if (convertedC >= base && c != '0') { // int("07", 5)
                        if (log) console.log(`${convertedC} is bigger than base ${base}, ValueError`);
                        throw new ValueError(`invalid literal for int() with base ${base}: '${orig}'`);
                    }
                }
            }
            
        }
        
        
        if (isFloat) {
            if (x < 0) {
                if (log) console.log(`x < 0, super(Math.ceil(${x})) return`);
                super(Math.ceil(x));
            } else {
                if (log) console.log(`x >= 0, super(Math.floor(${x})) return`);
                super(Math.floor(x));
            }
            return
        }
        if (base === 0) {
            if (log) console.log(`base === 0`);
            // CPython Objects\longobject.c.PyLong_FromString (lineno 2144)
            if (x[0] !== '0') {
                if (log) console.log(`0th digit not '0', base = 10`);
                base = 10;
            } else {
                if (log) console.log(`0th digit is '0'`);
                if (isHexaDecimal) {
                    if (log) console.log(`isHexaDecimal, base = 16`);
                    base = 16;
                } else {
                    if (log) console.log(`not isHexaDecimal`);
                    if (isOctal) {
                        if (log) console.log(`isOctal, base = 8`);
                        base = 8;
                    } else if (isBinary) {
                        if (log) console.log(`isBinary, base = 2`);
                        base = 2;
                    } else {
                        if (log) console.log(`not isHexaDecimal or isOctal or isBinary, base = 10`);
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
            if (log) console.log(`0th digit is 0 and either isHexaDecimal or isOctal or isBinary with matching base, x.slice(2)`);
            x = x.slice(2);
            
        }
        if (base !== 10) {
            if (log) console.log(`base !== 10, super(parseInt(${x}, <number>${base})) return`);
            super(parseInt(x, <number>base));
        } else {
            if (log) console.log(`base === 10, super(${x}) return`);
            super(x);
        }
    }
    
    
}

export function int(x = undefined, base?: string | number | Function, log?: boolean): Int {
    return new Int(x, base, log)
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
