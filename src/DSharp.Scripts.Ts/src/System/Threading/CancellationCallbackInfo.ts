export class CancellationCallbackInfo {
    _callback: any;
    _state: any;
    _tokenSource: any;
    
    constructor(callback, state, tokenSource) {
        this._callback = callback;
        this._state = state;
        this._tokenSource = tokenSource;
    }

    executeCallback() {
        this._callback(this._state);
    }
}