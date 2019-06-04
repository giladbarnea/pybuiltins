import {bool} from "../bool";

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
