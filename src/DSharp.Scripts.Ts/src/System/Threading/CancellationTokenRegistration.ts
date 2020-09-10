export class CancellationTokenRegistration {
    _callbackInfo: any;
    _registrationInfo: any;

    constructor(callbackInfo?, registrationInfo?) {
        this._callbackInfo = callbackInfo;
        this._registrationInfo = registrationInfo;
    }

    equals(other) {
        return this._callbackInfo === other._callbackInfo && this._registrationInfo.Source === other._registrationInfo.Source && this._registrationInfo.Index === other._registrationInfo.Index;
    }
    dispose() {
        this._tryDeregister();
    }
    private _tryDeregister() {
        if (this._registrationInfo.Source == null) {
            return false;
        }
        var prevailingCallbackInfo = this._registrationInfo.Source.safeRemove(this._registrationInfo.Index, this._callbackInfo);
        return prevailingCallbackInfo === this._callbackInfo;
    }
}