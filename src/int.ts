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
    
    static parseArgs(x, base) {
        let parsedX = x;
        let parsedBase = base;
        if (base === undefined) { // x is object
            console.log(cc('blue'), `x: ${x}, typeof x === '${typeof x}'`);
            parsedX = x.x;
            parsedBase = x.base;
            // let {x, base} = x;
        } else if (x === undefined) { // base is object
            console.log(cc('blue'), `base: ${base}, typeof base === '${typeof base}'`);
        }
        return [parsedX, parsedBase]
        /*
        0: undefined, 1: undefined  OK (0)
        
        0: undefined, 1: base       ?
        
        0: x, 1: undefined          OK
        
        0: x, 1: base               OK
        
        0: {object}, 1: undefined
            0: {undefined}          x = [0].x; base = [0].base;
            0: {x}                  x = [0].x; base = [0].base;
            0: {base}               x = [0].x; base = [0].base;
            0: {x, base}            x = [0].x; base = [0].base;
            
        0: undefined, 1: {object}
            1: {undefined}          x = [1].x; base = [1].base;
            1: {x}                  x = [1].x; base = [1].base;
            1: {base}               x = [1].x; base = [1].base;
            1: {x, base}            x = [1].x; base = [1].base;
        
        0: x, 1: {object}
            1: {undefined}          base = [1].base;
            1: {x}                  TypeError: Argument given by name ('x') and position (1)
            1: {base}               base = [1].base;
            1: {x, base}            TypeError: int() takes at most 2 arguments (3 given)
        
        0: {object}, 1: base
            0: {undefined}          x = [0].x;
            0: {x}                  x = [0].x;
            0: {base}               SyntaxError: keyword argument repeated
            0: {x, base}            SyntaxError: keyword argument repeated
            
        0: {object}, 1: {object}
            0: {undefined}
                1: {x}              x = [1].x; base = [1].base;
                1: {base}           x = [0].x; base = [1].base;
                1: {x, base}        x = [0].x; base = [1].base;
            0: {x}
                1: {undefined}      x = [0].x; base = [1].base;
                1: {x}              SyntaxError: keyword argument repeated
                1: {base}           x = [0].x; base = [1].base;
                1: {x, base}        SyntaxError: keyword argument repeated
            0: {base}
                1: {undefined}      x = [0].x; base = [0].base;
                1: {x}              x = [1].x; base = [0].base;
                1: {base}           SyntaxError: keyword argument repeated
                1: {x, base}        SyntaxError: keyword argument repeated
            0: {x, base}
                1: {undefined}      x = [0].x; base = [0].base;
                1: {x}              SyntaxError: keyword argument repeated
                1: {base}           SyntaxError: keyword argument repeated
                1: {x, base}        SyntaxError: keyword argument repeated
              
         */
    }
    
    constructor(x: string | number | IntOptions = undefined, base?: string | number | IntOptions, log?: boolean) {
        // console.log({x, base, log, arguments});
        const typeofx = typeof x;
        const typeofbase = typeof base;
        if ((typeofx === 'object' || typeofbase === 'object') &&
            x !== null && base !== null &&
            !Array.isArray(x) && !Array.isArray(base)) {
            console.log(cc('blue'), `typeofx === 'object' || typeofbase === 'object'`);
            [x, base] = Int.parseArgs(x, base);
            
        }
        let parsedInt = parseInt(x, base); // NaN if fails
        const origbase = base;
        if (log) console.log(cc(`black`, `constructor, x: ${x}, base: ${base}, parsedInt: ${parsedInt}, Number(x): ${Number(x)}`));
        
        if (x === undefined || x === false) {
            super(0);
            if (log) console.log(cc('bright magenta', 'x is undefined or false, super(0) return. this: ${this}'));
            return
        }
        
        if (typeofx !== 'number' && typeofx !== 'string') {
            if (log) console.log(cc('bright yellow', 'typeof x isnt number or string, TypeError'));
            throw new TypeError(`int() argument must be a string, a bytes-like object or a number, not '${typeofx}'`);
        }
        if (base === undefined) {
            base = 10;
            // Don't update parsedInt here; parseInt('0x11') === 17 (good), parseInt('0x11', 10) === 0 (bad).
            if (log) console.log(cc('cyan', `base === undefined => base=10`));
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
        
        if (typeofx === 'string') {
            // don't remove in-between spaces: '+314' valid, '+ 314' invalid
            // **  Trim
            x = x.trim(); // " + 314 " => "+ 314"
            nosign = x;
            if (log && orig !== x) console.log(cc('cyan', `after x.trim(): '${x}'`));
            if (x[0] === '-' || x[0] === '+') {
                sign = x[0] === '-' ? -1 : 1;
                nosign = x.slice(1);
                if (log) console.log(cc('cyan', `x[0] is '${x[0]}', sign is: ${sign}', nosign is: '${nosign}'`));
            }
            // Don't update parsedInt here; parseInt('0x11') === 17 (good), parseInt('0x11', 10) === 0 (bad).
            
            // **  Underscore
            if (x.includes('_')) {
                if (log) console.log(cc('blue', "x.includes('_')"));
                if (x.startsWith('_') || nosign.startsWith('_') || x.includes('__') || x.endsWith('_')) {
                    if (log) console.log(cc('bright yellow', `Leading / trailing / multiple underscore, ValueError`));
                    throw new ValueError(`invalid literal for int() with base ${base}: '${x}'`);
                }
                x = x.split('_').join('');
                // don't update or set nosign here
                parsedInt = parseInt(x, base);
                if (log) console.log(cc('cyan', `No leading / trailing / multiple underscore => x = '${x}', parsedInt = ${parsedInt}`));
            }
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
        if (nosign[0] === '0' && nosign[1] && RegExp(/[box]/, 'i').test(nosign[1])) {
            if (log) console.log(cc('cyan', `nosign[0] === '0', nosign[1] is [boxBOX] => prefix = nosign[1] = '${nosign[1]}'`));
            prefix = nosign[1];
            isBinary = prefix === 'b' || prefix === 'B';
            isOctal = prefix === 'o' || prefix === 'O';
            isHexaDecimal = prefix === 'x' || prefix === 'X';
            isSpecial = isBinary || isOctal || isHexaDecimal;
            specialBase = isBinary ? 2 : isOctal ? 8 : isHexaDecimal ? 16 : undefined;
        } else if (!isSpecial) { // int('9ba461594', 12)
            // can't possibly be special and float at the same time
            if (typeofx === 'string') {
                isFloat = x.indexOf('.') !== -1;
            } else {
                isFloat = parseFloat(x) - parseInt(x) !== 0;
            }
            if (log) console.log(cc('cyan', `!isSpecial => isFloat = ${isFloat}`));
        }
        
        // **  Update base 0 to matching special base
        if (base === 0) { // int(000, 0)
            if (log) console.log(cc('blue', `base === 0`));
            // CPython Objects\longobject.c.PyLong_FromString (lineno 2144)
            if (nosign[0] !== '0') { // int('711', 0), int('11', 0)
                if (log) console.log(cc('cyan', `nosign[0] !== '0' => base = 10`));
                base = 10;
            } else if (isSpecial) {
                if (log) console.log(cc('blue', `nosign[0] === '0'`));
                if (isHexaDecimal) { // int('0x123', 0), int('0x', 0) ValueError, int('0xffff_ffff', 0)
                    if (log) console.log(cc('cyan', `isHexaDecimal => base = 16`));
                    base = 16;
                } else if (isOctal) { // int('0o123', 0), int('0o', 0) ValueError, int('0o5_7_7', 0)
                    if (log) console.log(cc('cyan', `isOctal => base = 8`));
                    base = 8;
                } else if (isBinary) { // int('0b', 0) ValueError, int('0b100', 0), int('0b_0', 0)
                    if (log) console.log(cc('cyan', `isBinary => base = 2`));
                    base = 2;
                }
            } else { // int('000', 0), int('0_0_0', 0), int('-01', 0), int('0c11', 0), int('1b11', 0), int('07', 0), int('0_7', 0), int('0 if 1_Else 1', 0), int('0_b0', 0), int('0_xa', 0),
                if (log) console.log(cc('blue', `base === 0 but !isSpecial`));
            }
            // updating parsedInt here never changes anything, so don't
        }
        
        // **  Slice
        // equivalent to big cond in longobject.c:2160
        if (isSpecial && base === specialBase) {
            // with int('0o123', 0): updates from 0 to 83 (good)
            // int('0o', 8): 0 => NaN
            // int('0b100', 0): 0 => 4 (good)
            // int('0b2', 2): 0 => NaN
            // int('0b11', 0): 0 => 3 (good)
            // breakpoint: isNaN(parsedInt)? !isNaN(parseInt(x, base)): parsedInt !== parseInt(x, base)
            if (sign === undefined) {
                x = x.slice(2);
                parsedInt = parseInt(x, base);
            } else {
                x = x.slice(3);
                parsedInt = parseInt(x * sign, base);
            }
            nosign = x;
            if (log) console.log(cc('cyan', `isSpecial && base === specialBase => x = '${x}', nosign = '${nosign}', parsedInt = ${parsedInt}`));
            
        }
        
        
        // const mod1 = x % 1;
        if (typeofx === 'string') {
            if (log) {
                console.log(cc('blue', "typeofx === 'string'"));
                console.table({
                    'nosign[0]': nosign[0],
                    prefix,
                    x,
                    nosign,
                    isBinary,
                    isOctal,
                    isHexaDecimal,
                    isSpecial,
                    specialBase,
                    base,
                    origbase,
                    // mod1,
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
                if (convertedC >= base && c !== '0') { // int("07", 0), int("0c11"), int("0c11", 0), int("0c12", 2),
                    if (log) console.log(cc('bright yellow', `${convertedC} is >= base ${base}, ValueError`));
                    throw new ValueError(`invalid literal for int() with base ${origbase === undefined ? base : origbase}: '${orig}'`);
                }
            }
            if (Number.isInteger(parsedInt)) { // int('9ba461594', 12)
                super(parsedInt);
                if (log) console.log(cc('bright magenta', `if Number.isInteger(parsedInt), super(parsedInt = ${parsedInt}) and return. this: ${this}`));
                return
            }
            
            if (!RegExp(/\d/).test(x) ||    // empty strings
                x.includes(' ')) { // int("+ 314")
                if (log) console.log(cc('bright yellow', `x.includes(' ') no /\d/ in x, ValueError`));
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

interface IntOptions {
    x?: string | number,
    base?: number,
    log?: boolean
}

export function int(x: string | number | IntOptions = undefined, base?: string | number | IntOptions, log?: boolean): Int {
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
