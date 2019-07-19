import {ZeroDivisionError, ValueError} from "./exceptions"
import {cc} from "./util";


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
    
    
    constructor(x = undefined, base?: string | number | Function, log?: boolean) {
        let parsedInt = parseInt(x, <number>base); // NaN if fails
        const origbase = base;
        if (log) console.log(cc(`black underscore`, `constructor, x: ${x}, base: ${base}, parsedInt: ${parsedInt}, Number(x): ${Number(x)}`));
        
        if (x === undefined || x === false) {
            super(0);
            if (log) console.log(cc('bright magenta', 'x is undefined or false, super(0) return. this: ${this}'));
            return
        }
        const typeofx = typeof x;
        if (typeofx !== 'number' && typeofx !== 'string') {
            if (log) console.log(cc('bright yellow', 'typeof x isnt number or string, TypeError'));
            throw new TypeError(`int() argument must be a string, a bytes-like object or a number, not '${typeofx}'`);
        }
        if (base === undefined) {
            base = 10;
            // Don't update parsedInt here; parseInt('0x11') === 17 (good), parseInt('0x11', 10) === 0 (bad).
            if (log) console.log(cc('cyan', `base === undefined => base=10, parsedInt=${parsedInt}`));
        } else {
            if (base === null) {
                if (log) console.log(cc('bright yellow', 'base === null, TypeError'));
                throw new TypeError(`'null' object cannot be interpreted as an integer`);
            }
            if (base !== 0 && base < 2 || base > 36) {
                if (log) console.log(cc('bright yellow', 'base out of range, ValueError'));
                throw new ValueError("int() base must be >= 2 and <= 36, or 0");
            }
            // base was passed explicitly
            if (typeofx === 'number') {
                if (log) console.log(cc('bright yellow', 'x is number, TypeError'));
                throw new TypeError(`int() can't convert non-string with explicit base`)
            }
        }
        
        
        const orig = x;
        let sign = undefined;
        let nosign = x;
        // **  Trim
        try {
            // don't remove in-between spaces: '+314' valid, '+ 314' invalid
            
            x = x.trim(); // " + 314 " => "+ 314"
            nosign = x;
            if (log && orig !== x) console.log(cc('cyan', `after x.trim(): '${x}'`));
            if (x[0] === '-' || x[0] === '+') {
                sign = x[0] === '-' ? -1 : 1;
                nosign = x.slice(1);
                if (log) console.log(cc('cyan', `x[0] is '${x[0]}', sign is: ${sign}', nosign is: '${nosign}'`));
            }
            // Don't update parsedInt here; parseInt('0x11') === 17 (good), parseInt('0x11', 10) === 0 (bad).
            if (log) console.log(cc('cyan', `parsedInt = parseInt(x, base) = ${parsedInt}`));
        } catch (e) {
            if (!(e instanceof TypeError)) // Failed not because number doesn't have 'trim' function
                throw e
        }
        
        // ***  Special number handling
        let prefix = null;
        let isBinary = false;
        let isOctal = false;
        let isHexaDecimal = false;
        let isSpecial = false;
        let specialBase = undefined;
        let isFloat = false;
        
        // **  isSpecial
        if (nosign[0] === '0' && nosign[1] && RegExp(/[a-zA-Z]/).test(nosign[1])) {
            if (log) console.log(cc('cyan', `nosign[0] === '0', nosign[1] is [a-zA-Z] => prefix = nosign[1] = '${nosign[1]}'`));
            prefix = nosign[1];
            isBinary = prefix === 'b' || prefix === 'B';
            isOctal = prefix === 'o' || prefix === 'O';
            isHexaDecimal = prefix === 'x' || prefix === 'X';
            isSpecial = isBinary || isOctal || isHexaDecimal;
            specialBase = isBinary ? 2 : isOctal ? 8 : isHexaDecimal ? 16 : undefined;
        } else if (!isSpecial) { // int('9ba461594', 12)
            // can't possibly be special and float at the same time
            isFloat = RegExp(/\./).test(x);
            if (log) console.log(cc('cyan', `!isSpecial => isFloat = /./ in x = ${isFloat}`));
        }
        
        // **  Update base 0 to matching special base
        if (base === 0) { // int(000, 0)
            if (log) console.log(cc('blue', `base === 0`));
            // CPython Objects\longobject.c.PyLong_FromString (lineno 2144)
            if (nosign[0] !== '0') { // int('711', 0), int('11', 0)
                if (log) console.log(cc('cyan', `nosign[0] !== '0' => base = 10`));
                base = 10;
            } else {
                if (log) console.log(cc('blue', `nosign[0] === '0'`));
                if (isHexaDecimal) {
                    if (log) console.log(cc('cyan', `isHexaDecimal => base = 16`));
                    base = 16;
                } else {
                    if (log) console.log(cc('blue', `!isHexaDecimal`));
                    if (isOctal) {
                        if (log) console.log(cc('cyan', `isOctal => base = 8`));
                        base = 8;
                    } else if (isBinary) {
                        if (log) console.log(cc('cyan', `isBinary => base = 2`));
                        base = 2;
                    }
                }
            }
            // updating parsedInt here never changes anything, so don't
        }
        // **  Underscore
        try {
            if (x.includes('_')) {
                
                if (x.startsWith('_') || x.includes('__') || x.endsWith('_')) {
                    if (log) console.log(cc('bright yellow', `Leading / trailing / multiple underscore, ValueError`));
                    throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
                }
            }
        } catch (e) {
            if (!(e instanceof TypeError)) // Failed not because number doesn't have 'includes' function
                throw e
        }
        // equivalent to big cond in longobject.c:2160
        if (isSpecial && base === specialBase) {
            x = x.slice(2);
            nosign = x;
            // with int('0o123', 0): updates from 0 to 83 (good)
            // int('0o', 8): 0 => NaN
            // int('0b100', 0): 0 => 4 (good)
            // int('0b2', 2): 0 => NaN
            // int('0b11', 0): 0 => 3 (good)
            // breakpoint: isNaN(parsedInt)? !isNaN(parseInt(x, base)): parsedInt !== parseInt(x, base)
            parsedInt = parseInt(x, <number>base);
            
        }
        
        
        const mod1 = x % 1;
        if (typeofx === 'string') {
            if (log) {
                console.log(cc('blue', "typeofx === 'string'"));
                console.table({
                    'nosign[0]': nosign[0],
                    prefix,
                    'nosign[2]': nosign[2],
                    x,
                    nosign,
                    isBinary,
                    isOctal,
                    isHexaDecimal,
                    isSpecial,
                    specialBase,
                    base,
                    origbase,
                    mod1,
                    isFloat,
                    parsedInt,
                    'Number(x)': Number(x),
                    'Number(nosign)': Number(nosign),
                    
                },);
            }
            
            if (isFloat) { // int('1.5')
                
                if (log) console.log(cc('bright yellow', 'isFloat, ValueError'));
                throw new ValueError(`invalid literal for int() with base ${base}: '${orig}'`);
            }
            
            if (isSpecial && origbase === undefined) {
                if (log) console.log(cc(`bright yellow`, `isSpecial && origbase === undefined, ValueError`));
                throw new ValueError(`invalid literal for int() with base ${base}: '${orig}'`)
            }
            
            
            for (let c of x) {
                let convertedC;
                if (RegExp(/[a-zA-Z]/).test(c)) {
                    convertedC = parseInt(c, 36);
                    if (log) console.log(cc('cyan', `in for loop, converted '${c}' to: ${convertedC}`));
                } else {
                    convertedC = c;
                }
                if (convertedC >= base && c != '0') { // int("07", 0), int("0c11"), int("0c11", 0), int("0c12", 2),
                    if (log) console.log(cc('bright yellow', `${convertedC} is bigger than base ${base}, ValueError`));
                    throw new ValueError(`invalid literal for int() with base ${origbase === undefined ? base : origbase}: '${orig}'`);
                }
            }
            
            
            if (Number.isInteger(parsedInt)) { // int('9ba461594', 12)
                super(parsedInt);
                if (log) console.log(cc('bright magenta', `if (parsedInt), super(parsedInt = ${parsedInt}) and return. this: ${this}`));
                return
            }
            
            if (!RegExp(/\d/).test(x) || // int('0x', 16) int('0o', 8) int('0b', 2), int('_0', 0)
                isNaN(mod1)) { // int("+ 314")
                if (log) console.log(cc('bright yellow', `isNaN(mod1 = ${mod1}) or x = '${x}' is /\d/, ValueError`));
                throw new ValueError(`invalid literal for int() with base ${origbase === undefined ? base : origbase}: '${orig}'`);
            }
            
            
        }
        
        
        if (isFloat) { // 3.14
            
            if (x < 0) {
                super(Math.ceil(x));
                if (log) console.log(cc('bright magenta', `x < 0, super(Math.ceil(${x})) return. this: ${this}`));
            } else {
                super(Math.floor(x));
                if (log) console.log(cc('bright magenta', `x >= 0, super(Math.floor(${x})) return. this: ${this}`));
            }
            return
        }
        
        if (base !== 10) { // int("10", 16)
            super(parsedInt);
            if (log) console.log(cc('bright magenta', `base !== 10, super(parsedInt = ${parsedInt}}) return. this: ${this}`));
        } else { // int(314)
            super(x);
            if (log) console.log(cc('bright magenta', `base === 10, super(${x}) return. this: ${this}`));
        }
    }
    
    
}

export function int(x = undefined, base?: string | number | Function, log?: boolean): Int {
    return new Int(x, base, log)
}

// console.log('4_2');
// int('_1');
// let n1 = int(5);
// let n2 = int(10);
// let n0 = int(0);
// console.log('n0.valueOf(): ', n0.valueOf());
// console.log('n0.toString(): ', n0.toString());
// console.log('Boolean(n0): ', Boolean(n0));
// console.log("int('0x123', 16) ", int('0x123', 16));
// console.log("int('0x', 16) ", int('0x', 16));
