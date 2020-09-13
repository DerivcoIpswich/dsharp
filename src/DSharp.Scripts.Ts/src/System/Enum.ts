function createEnumMap(enumMap) {
    var outerMap = {};
    for (var key in enumMap) {
        outerMap[enumMap[key]] = key;
    }
    return {
        Values: outerMap,
        Keys: enumMap
    };
}

export class Enum{
    static map: object = {};

    private _name: string;
    private map: object = {};

    constructor(name: string, enumMap){
        Enum.map[name] = createEnumMap(enumMap);

        this._name = name;
        this.map = enumMap;
        Object.assign(this, enumMap);
    }

    public toString(){
        return this._name;
    }

    public valueOf(){
        return this._name;
    }

    static getValues(enumeration: Enum) {
        var map = Enum.map[enumeration._name];
        return map && Object.values(map.Keys);
    }

    static getNames(enumeration: Enum) {
        var map = Enum.map[enumeration._name];
        return map && Object.keys(map.Keys);
    }

    static getName(enumeration: Enum, value: any) {
        var map = Enum.map[enumeration._name];
        return map && map.Values[value];
    }

    static hasFlag(enumValue: any, flag: any) {
        return (enumValue | flag) === enumValue;
    }
}