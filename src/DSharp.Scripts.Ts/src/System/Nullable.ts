export class Nullable{
    private _value: any;
    constructor(value: any){
        this._value = value;
    }

    get HasValue(){
        return this._value !== undefined;
    }

    get Value(){
        return this._value;
    }

    getValueOrDefault(defaultValue) {
        return this._value || defaultValue;
    }

    valueOf(){
        return this._value;
    }

    toString(){
        return this._value;
    }
}
