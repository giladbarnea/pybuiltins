import {abs} from '../abs'

describe('abs(number)', () => {
    test.skip("doesn't change positive number", () => {
        const actual = abs(5);
        expect(actual).toEqual(5)
    });
    test.skip("returns the oppositve of negative number", () => {
        const actual = abs(-5);
        expect(actual).toEqual(5)
    });
    test.skip("doesn't change a zero", () => {
        const actual = abs(0);
        expect(actual).toEqual(0)
    });
});
describe('abs(things that raise TypeError)', () => {
    test.skip('when passed number string', () => {
        for (let i = -10; i < 10; i++)
            expect(() => abs(`${i}`)).toThrow(TypeError("bad operand type for abs(): 'string'"))
    });
    test.skip('when passed []', () => {
        expect(() => abs([])).toThrow(TypeError("bad operand type for abs(): 'object' (Array)"))
    });
    // test.skip('when passed {}', () => {
    //     expect(() => abs([])).toThrow(TypeError("bad operand type for abs(): 'object' (Array)"))
    // });
    test.skip('when passed null', () => {
        expect(() => abs(null)).toThrow(TypeError("bad operand type for abs(): 'null'"))
    });
});

describe('abs(bool)', () => {
    test.skip('returns 0 when passed false', () => {
        expect(abs(false)).toEqual(0)
    });
    test.skip('returns 1 when passed true', () => {
        expect(abs(true)).toEqual(1)
    });
});
