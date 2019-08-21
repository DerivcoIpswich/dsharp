
describe('keyExists', () => {
    test('missing key returns false', () => {
        const keyExists = require('../dist/ss.js').keyExists;
        expect(keyExists({ }, 'a')).toBe(false);
    });

    test('existing key returns true', () => {
        const keyExists = require('../dist/ss.js').keyExists;
        expect(keyExists({ a: 1 }, 'a')).toBe(true);
    });
});