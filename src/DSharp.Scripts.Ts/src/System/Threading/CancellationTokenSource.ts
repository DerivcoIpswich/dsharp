import { CancellationCallbacks } from "./CancellationCallbacks";
import { CancellationToken } from "./CancellationToken";
import { CancellationTokenRegistration } from "./CancellationTokenRegistration";
import { CancellationCallbackInfo } from "./CancellationCallbackInfo";
import { ExceptionHelper } from "../ExceptionHelper";

export class CancellationTokenSource {
    private static _staticSource: CancellationTokenSource;
    _cancellationState: number;
    _registeredCallbacks: any;

    constructor() {
        this._cancellationState = 0;
        this._cancellationState = 1;
        this._registeredCallbacks = new CancellationCallbacks();
    }

    get Token() {
        return new CancellationToken(this);
    }
    get IsCancellationRequested() {
        return this._cancellationState > 1;
    }
    get IsCancellationCompleted() {
        return this._cancellationState === 3;
    }
    get CanBeCancelled() {
        return !!this._cancellationState;
    }
    cancel() {
        if (this.IsCancellationRequested) {
            return;
        }
        this._cancellationState = 2;
        this._executeCallbacks();
    }
    dispose() {
    }
    _internalRegister(callback, state) {
        if (this.IsCancellationRequested) {
            callback(state);
            return new CancellationTokenRegistration();
        }
        var callbackInfo = new CancellationCallbackInfo(callback, state, this);
        var registrationInfo = this._registeredCallbacks.add(callbackInfo);
        return new CancellationTokenRegistration(callbackInfo, registrationInfo);
    }
    _executeCallbacks() {
        if (this._registeredCallbacks.Count <= 0) {
            return;
        }
        var exceptions: Error[] = [];
        for (var index = this._registeredCallbacks.Count - 1; index >= 0; index--) {
            var registeredCallback = this._registeredCallbacks.get_item(index);
            this._executeCallback(registeredCallback, index, function (exception) {
                exceptions.push(exception);
            });
        }
        this._cancellationState = 3;
        if (exceptions.length > 0) {
            throw ExceptionHelper.throwAggregateException(exceptions);
        }
    }
    _executeCallback(registeredCallback, currentIndex, onError) {
        if (registeredCallback == null) {
            return;
        }
        try {
            this._registeredCallbacks.safeRemove(currentIndex, registeredCallback);
            registeredCallback.executeCallback();
        }
        catch (e) {
            if (onError != null) {
                onError(e);
            }
        }
    }

    static get StaticSource() {
        if (CancellationTokenSource._staticSource == null) {
            CancellationTokenSource._staticSource = new CancellationTokenSource();
            CancellationTokenSource._staticSource._cancellationState = 0;
        }
        return CancellationTokenSource._staticSource;
    }
}