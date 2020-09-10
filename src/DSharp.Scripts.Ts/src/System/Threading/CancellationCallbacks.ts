import { CallbackInsertionIndex } from "./CallbackInsertionIndex";
import { removeAt } from "../Collections/CollectionHelpers";

export class CancellationCallbacks {
    private _cancellationCallbacks: Function[];

    constructor() {
        this._cancellationCallbacks = [];
    }

    get Count() {
        return this._cancellationCallbacks.length;
    }

    add(callbackInfo) {
        var index = this._cancellationCallbacks.indexOf(callbackInfo);
        if (index >= 0) {
            this._cancellationCallbacks[index] = callbackInfo;
            return new CallbackInsertionIndex(index, this);
        }
        this._cancellationCallbacks.push(callbackInfo);
        return new CallbackInsertionIndex(this.Count - 1, this);
    }
    
    safeRemove(index, callbackInfo) {
        if (!this._isIndexInRange(index) || callbackInfo == null) {
            return null;
        }
        var existingCallbackInfo = this._cancellationCallbacks[index];
        if (callbackInfo !== existingCallbackInfo) {
            return existingCallbackInfo;
        }
        removeAt(this._cancellationCallbacks, index);
        return existingCallbackInfo;
    }

    private _isIndexInRange(index) {
        return index >= 0 && index < this.Count;
    }

    get_item(index) {
        if (!this._isIndexInRange(index)) {
            return null;
        }
        return this._cancellationCallbacks[index];
    }
}