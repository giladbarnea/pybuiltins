import {any} from "../any";


describe('any', () => {
    it('should be falsey with empty list', () => {
        
        
        const actual = any([]);
        
        expect(actual).toEqual(false)
    })
});
