import { ExceptionHelper } from "../ExceptionHelper";
import { CancellationTokenRegistration } from "./CancellationTokenRegistration";
import { CancellationTokenSource } from "./CancellationTokenSource";

export class CancellationToken {
    private _source: any;

    constructor(source) {
        this._source = source;
    }

    get IsCancellationRequested() {
        return this._source != null && this._source.IsCancellationRequested;
    }
    get CanBeCancelled() {
        return this._source != null && this._source.CanBeCancelled;
    }

    register(callback) {
        return this.registerWithState(CancellationToken._wrappedCancelAction, callback);
    }
    registerWithState(callback, state) {
        if (callback == null) {
            throw ExceptionHelper.throwArgumentNullException('callback');
        }
        if (!this.CanBeCancelled) {
            return new CancellationTokenRegistration();
        }
        return this._source._internalRegister(callback, state);
    }
    equals(other) {
        if (this._source == null && other._source == null) {
            return true;
        }
        if (this._source == null) {
            return other._source === CancellationTokenSource.StaticSource;
        }
        if (other._source == null) {
            return other._source === CancellationTokenSource.StaticSource;
        }
        return this._source === other._source;
    }

    static get None(){
        return new CancellationToken(CancellationTokenSource.StaticSource);
    }

    private static _wrappedCancelAction(state) {
        var action = state;
        if (action != null) {
            action();
        }
    };
}