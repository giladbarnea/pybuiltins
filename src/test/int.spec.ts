import {int} from "../int";

test('test_basic', () => {
    expect(int(314)).toEqual(314);
    expect(int(3.14)).toEqual(3);
});
