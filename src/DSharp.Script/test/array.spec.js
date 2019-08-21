
describe('array', () => {
    test('null returns null', () => {
const array = require('../dist/ss.js').array;
        expect(array(null)).toBeNull();
    });

    test('arguments is converted to array', () => {
const array = require('../dist/ss.js').array;
        expect(Array.isArray(arguments)).toBe(false);
        expect(Array.isArray(array(arguments))).toBe(true);
    });

    test('array is cloned', () => {
const array = require('../dist/ss.js').array;
        const arr = [1,2,3];
        expect(array(arr)).not.toBe(arr);
        expect(array(arr)).toEqual(arr);
    });
});