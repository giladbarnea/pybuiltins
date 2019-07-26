import * as perf from "./perf"


function isRoundNumber(x): boolean {
    
    // TODO: Number.MAX_SAFE_INTEGER / 2 == 4503599627370495.5
    //  4503599627370495 is sensitive to 1/2 resolution (.0, .5, 1)
    //  MAX_SAFE_INTEGER / 4: .0, .2, .5, .8
    //  MAX_SAFE_INTEGER / 5: .0, .2, .5, .8
    //  MAX_SAFE_INTEGER / 6: .0, .2, .5, .8
    //  MAX_SAFE_INTEGER / 7: .0, .2, .5, .8
    //  MAX_SAFE_INTEGER / 8: .0, .1, .2, .4, .5, .6, .8, .9
    //  MAX_SAFE_INTEGER / 9 (1000799917193443.5): .0, .1, .2, .4, .5, .6, .8, .9
    //  1e+21 is lower limit for toString()
    // return typeof x === 'number' && parsedFloat - parsedInt === 0
    return typeof x === 'number' && Math.round(x) - x === 0
}


function cc(val: string, ...args) {
    const colorsDict = {
        reset: '\x1b[0m',
        bright: '\x1b[1m',
        dim: '\x1b[2m',
        underscore: '\x1b[4m',
        blink: '\x1b[5m',
        reverse: '\x1b[7m',
        hidden: '\x1b[8m',
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        bgblack: '\x1b[40m',
        bgred: '\x1b[41m',
        bggreen: '\x1b[42m',
        bgyellow: '\x1b[43m',
        bgblue: '\x1b[44m',
        bgmagenta: '\x1b[45m',
        bgcyan: '\x1b[46m',
        bgwhite: '\x1b[47m',
        
    };
    let words = val.split(' ');
    
    if (args.length === 0) {
        let colorStr = '';
        while (true) {
            let splice = words.splice(0, 1);
            let color = colorsDict[splice[0]];
            if (color === undefined) {
                words = [...splice, ...words];
                break;
            }
            colorStr += color;
        }
        return colorStr + words.join(' ') + colorsDict.reset
        
    }
    return `${words.map(c => colorsDict[c]).join('')}${args}${colorsDict.reset}`
    // return [words.map(c => colorsDict[c]).join('') + args[0], ...args.slice(1)]
}

export {perf, cc, isRoundNumber}
