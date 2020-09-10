export class CallbackInsertionIndex {
    private _index: any;
    private _source: any;

    constructor(index, source) {
        this._index = index || 0;
        this._source = source;
    }

    get Index() {
        return this._index;
    }

    get Source() {
        return this._source;
    }
}