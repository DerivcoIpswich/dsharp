
describe('keyCount', () => {
    test('number of properties are returned', () => {
        const keyCount = require('../dist/ss.js').keyCount;
        expect(keyCount({ })).toEqual(0);
        expect(keyCount({ a: 1 })).toEqual(1);
        expect(keyCount({ a: 1, b: 2 })).toEqual(2);
        expect(keyCount({ a: 1, b: 2, c: 3 })).toEqual(3);
    });
});