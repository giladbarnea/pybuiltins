import {int} from "../int";

test('test_basic', () => {
    expect(int(314)).toEqual(314);
    let actual = int(3.14);
    console.log(actual);
    expect(actual).toEqual(3);
});
