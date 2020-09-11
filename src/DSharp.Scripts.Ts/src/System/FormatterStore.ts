export class FormatterStore{
    private _formatters: object = {};

    constructor(){
        this._formatters = {};
    }

    get Formatters(){
        return this._formatters;
    }

    setFormatter(typeName: string, formatter: Function){
        this._formatters[typeName] = formatter;
    }
}

export let formatters = new FormatterStore();