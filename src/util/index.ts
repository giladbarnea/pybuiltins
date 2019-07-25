import * as perf from "./perf"

function isFloat(x): boolean {
    return typeof x === 'number' && parseFloat(x) - parseInt(x) !== 0
}


function isRoundNumber(x): boolean {
    // TODO: refactor parseFloat.. with isFloat. after that, test if x==='number' is redundant.
    return typeof x === 'number' && parseFloat(x) - parseInt(x) === 0
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

export {perf, cc, isRoundNumber, isFloat}
