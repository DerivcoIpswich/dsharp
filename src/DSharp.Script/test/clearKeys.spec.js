
describe('clearKeys', () => {
    test('missing key returns false', () => {
        const clearKeys = require('../dist/ss.js').clearKeys;
        const obj = {a:1, b:2, c:3};
        
        clearKeys(obj);

        expect(obj).toEqual({});
    });
});