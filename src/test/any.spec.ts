import {any} from '../index'


describe('any', () => {
    it('should be falsey with empty list', () => {
        
        
        const actual = any([]);
        
        expect(actual).toEqual(false)
    })
});
