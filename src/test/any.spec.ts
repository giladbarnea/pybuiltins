import {any} from "../any";


describe('any', () => {
    it.skip('should be falsey with empty list', () => {
        
        
        const actual = any([]);
        
        expect(actual).toEqual(false)
    })
});
