
describe('value', () => {
    test('null is returned if no values are passed', () => {
        const value = require('../dist/ss.js').value;
        expect(value()).toBeNull();
        expect(value(null)).toBeNull();
        expect(value(null, null)).toBeNull();
    });

    test('first argument is returned if it is a value', () => {
        const value = require('../dist/ss.js').value;
        expect(value(1)).toBe(1);
        expect(value(1, 2)).toBe(1);
        expect(value(1, 2, 3)).toBe(1);
    });

    test('second argument is returned if it is a value but first is not', () => {
        const value = require('../dist/ss.js').value;
        expect(value(null, 2)).toBe(2);
        expect(value(null, 2, 3)).toBe(2);
    });
    
    test('third argument is returned if it is the first passed value', () => {
        const value = require('../dist/ss.js').value;
        expect(value(null, null, 3)).toBe(3);
    });
});