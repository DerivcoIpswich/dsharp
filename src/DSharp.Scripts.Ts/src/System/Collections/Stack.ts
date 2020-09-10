import { ArrayEnumerator } from "./Enumerator";

export class Stack{
    private _items: any[];
    count: number;

    constructor(){
        this.count = 0;
        this._items = [];
    }

    clear() {
        this._items.length = 0;
        this.count = 0;
    }
    contains(item: any) {
        for (var i = this.count - 1; i >= 0; i--) {
            if (this._items[i] === item) {
                return true;
            }
        }
        return false;
    }
    getEnumerator() {
        return new ArrayEnumerator(this._items.reverse());
    }
    peek() {
        return this._items[this.count - 1];
    }
    push(item: any) {
        this._items.push(item);
        this.count++;
    }
    pop() {
        if (this.count) {
            this.count--;
            return this._items.pop();
        }
        return undefined;
    }
}