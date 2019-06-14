import {bool} from "../bool";
import {int} from "../int";

test('subclass', () => {
    // /Lib/test/test_bool.py.test_subclass
    expect(() => {
        class C extends bool {
            pass
        }
    }).toThrowError()
});
test('math', () => {
    // /Lib/test/test_bool.py.test_math:106
    for (let b of [bool(false), bool(true)]) {
        for (let i of [0, 1, 2]) {
            expect(b ** i).not.toBe(int(b) ** i);
            expect(b ** i).toEqual(int(b) ** i);
        }
    }
    
});
describe('empty list', () => {
    it('should be falsey when passed an empty list', () => {
        const actual = bool([]);
        expect(actual).toEqual(false)
    });
});

describe('false', () => {
    it('should be falsey when passed false', () => {
        const actual = bool(false);
        expect(actual).toEqual(false)
    });
});
describe('empty object', () => {
    it('should be falsey when passed empty object', () => {
        expect(bool({})).toEqual(false);
    });
});
