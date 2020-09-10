import { isValue } from "../../Helpers";

export class StringBuilder{
    private _parts: string[];
    isEmpty: boolean;

    constructor(str?: string){
        this._parts = isValue(str) && str !== '' ? [str] : new Array();
        this.isEmpty = this._parts.length == 0;
    }

    append(str: string) {
        if (isValue(str) && str !== '') {
            this._parts.push(str);
            this.isEmpty = false;
        }
        return this;
    }

    appendLine(str: string) {
        this.append(str);
        this.append('\r\n');
        this.isEmpty = false;
        return this;
    }

    clear() {
        this._parts = [];
        this.isEmpty = true;
    }

    toString(str?: string) {
        return this._parts.join(str || '');
    }
}