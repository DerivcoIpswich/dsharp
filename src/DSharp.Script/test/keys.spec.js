
describe('keys', () => {
    test('object keys are returned', () => {
        const keys = require('../dist/ss.js').keys;
        const obj = { a: null, b: true, c: "" };

        const result = keys(obj);
        
        expect(result.length).toEqual(3);
        expect(result).toEqual(expect.arrayContaining(['a', 'b', 'c']));
    });

    test('empty object returns empty array', () => {
        const keys = require('../dist/ss.js').keys;
        expect(keys({})).toEqual([]);
    });
});