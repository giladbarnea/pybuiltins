"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
function bool(val) {
    /*
    |               | o instanceof Object   | typeof o == 'object'  |  !!o  |
    |  -----------  |  ------------------   |  -------------------  | ----- |
    |  {}           |         true          |         true          | true  |
    |  []           |         true          |         true          | true  |
    |  ()=>{}       |         true          |         false         | true  |
    |  new class{}  |         true          |         true          | true  |
    |  (()=>{})()   |         false         |         false         | false |
    |  0            |         false         |         false         | false |
    |  ""           |         false         |         false         | false |
    |  null         |         false         |         true          | false |
    |  undefined    |         false         |         false         | false |
    |  "0"          |         false         |         false         | true  |
    |  "foo"        |         false         |         false         | true  |
    */
    if (val == null)
        return false;
    var valType = typeof val;
    if (valType != 'object') {
        if (valType == 'function')
            return true;
        else
            return !!val;
    }
    return !val.isEmpty();
}
exports.bool = bool;
function enumerate(collection) {
    var entries = Object.entries(collection);
    entries.map(function (entry) { return entry[0] = entry[0].isdigit()
        ? int(entry[0])
        : entry[0]; });
    return entries;
}
exports.enumerate = enumerate;
function float(str) {
    return parseFloat(str);
}
exports.float = float;
function int(num) {
    return Math.floor(num);
}
exports.int = int;
function max() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return Math.max.apply(Math, values);
}
exports.max = max;
function min() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return Math.min.apply(Math, values);
}
exports.min = min;
function range(start, stop) {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = start;
                _a.label = 1;
            case 1:
                if (!(i <= stop)) return [3 /*break*/, 4];
                return [4 /*yield*/, i];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.range = range;
function round(n, d) {
    if (d === void 0) { d = 0; }
    var fr = Math.pow(10, d);
    return int(n * fr) / fr;
}
exports.round = round;
function str(val) {
    return val ? val.toString() : "";
}
exports.str = str;
function zip(arr1, arr2) {
    var _a, _b, _i, key;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = [];
                for (_b in arr1)
                    _a.push(_b);
                _i = 0;
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                key = _a[_i];
                return [4 /*yield*/, [arr1[key], arr2[key]]];
            case 2:
                _c.sent();
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.zip = zip;
