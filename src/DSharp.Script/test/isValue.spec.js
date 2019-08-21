
describe('isValue', () => {
    test('null is not a value', () => {
        const isValue = require('../dist/ss.js').isValue;
        expect(isValue(null)).toBe(false);
    });

    test('undefined is not a value', () => {
        const isValue = require('../dist/ss.js').isValue;
        const object = {};
        expect(isValue(object.property)).toBe(false);
    });

    test('empty string is a value', () => {
        const isValue = require('../dist/ss.js').isValue;
        expect(isValue("")).toBe(true);
    });

    test('string is a value', () => {
        const isValue = require('../dist/ss.js').isValue;
        expect(isValue("string")).toBe(true);
    });

    test('0 is a value', () => {
        const isValue = require('../dist/ss.js').isValue;
        expect(isValue(0)).toBe(true);
    });

    test('1 is a value', () => {
        const isValue = require('../dist/ss.js').isValue;
        expect(isValue(1)).toBe(true);
    });
    
    test('false is a value', () => {
        const isValue = require('../dist/ss.js').isValue;
        expect(isValue(false)).toBe(true);
    });

    test('true is a value', () => {
        const isValue = require('../dist/ss.js').isValue;
        expect(isValue(true)).toBe(true);
    });

    test('function is a value', () => {
        const isValue = require('../dist/ss.js').isValue;
        expect(isValue(function(){})).toBe(true);
    });
});