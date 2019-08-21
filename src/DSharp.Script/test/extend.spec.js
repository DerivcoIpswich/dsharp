
describe('extend', () => {
    test('null object throws when properties are given', () => {
        const extend = require('../dist/ss.js').extend;
        expect(() => {extend(null, {b:2})}).toThrow();
    });

    test('object has properties and values copied from another object', () => {
        const extend = require('../dist/ss.js').extend;
        const object = {a:1};
        const anotherObject = {b:2, c: ()=>{}, d:null};
        const result = extend(object, anotherObject);

        expect(result).toStrictEqual(object);
        expect(result.a).toEqual(1);
        expect(result.b).toEqual(2);
        expect(result.c).toEqual(anotherObject.c);
        expect(result).toHaveProperty('d');
        expect(result.d).toBeNull();
    });
});