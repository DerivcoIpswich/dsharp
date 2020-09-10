import { ArrayEnumerator } from "./Enumerator";

export function _cleanQueue(q) {
    q._items = q._items.slice(q._offset);
    q._offset = 0;
}

export class Queue{
    private _offset: number;
    private _items: any[];
    count: number;

    constructor(){
        this.count = 0;
        this._items = [];
        this._offset = 0;
    }

    clear() {
        this._items.length = 0;
        this._offset = 0;
        this.count = 0;
    }
    contains(item) {
        for (var i = this._offset, length = this._items.length; i <= length; i++) {
            if (this._items[i] === item) {
                return true;
            }
        }
        return false;
    }
    dequeue() {
        if (this.count) {
            var item = this._items[this._offset];
            if (++this._offset * 2 >= this._items.length) {
                _cleanQueue(this);
            }
            this.count--;
            return item;
        }
        return undefined;
    }
    enqueue(item) {
        this._items.push(item);
        this.count++;
    }
    getEnumerator() {
        if (this._offset != 0) {
            _cleanQueue(this);
        }
        return new ArrayEnumerator(this._items);
    }
    peek() {
        return this._items.length
            ? this._items[this._offset]
            : undefined;
    }
}