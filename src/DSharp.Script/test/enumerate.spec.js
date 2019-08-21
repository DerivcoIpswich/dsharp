
describe('enumerate', () => {
    test('null returns empty enumerator', () => {
        const enumerate = require('../dist/ss.js').enumerate;
        const result = enumerate(null);
        expect(result.moveNext()).toBe(false);
    });

    test('empty array returns empty enumerator', () => {
        const enumerate = require('../dist/ss.js').enumerate;
        const result = enumerate([]);
        expect(result.moveNext()).toBe(false);
    });

    test('empty object returns empty enumerator', () => {
        const enumerate = require('../dist/ss.js').enumerate;
        const result = enumerate([]);
        expect(result.moveNext()).toBe(false);
    });

    test('array returns elements', () => {
        const enumerate = require('../dist/ss.js').enumerate;
        const result = enumerate([1,2,3]);

        result.moveNext();
        expect(result.current).toBe(1);
        result.moveNext();
        expect(result.current).toBe(2);
        result.moveNext();
        expect(result.current).toBe(3);
        expect(result.moveNext()).toBe(false);
    });

    test('object returns key-value-pairs', () => {
        const enumerate = require('../dist/ss.js').enumerate;
        const result = enumerate({a:1,b:2,c:3});

        result.moveNext();
        expect(result.current).toEqual({key:'a', value:1});
        result.moveNext();
        expect(result.current).toEqual({key:'b', value:2});
        result.moveNext();
        expect(result.current).toEqual({key:'c', value:3});
        expect(result.moveNext()).toBe(false);
    });
});