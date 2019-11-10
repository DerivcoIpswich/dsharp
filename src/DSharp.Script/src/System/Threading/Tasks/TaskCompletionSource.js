
function TaskCompletionSource() {
    this._isCompleted = false;
    this.task = new promise(function (resolve, reject) {
        this._reject = reject;
        this._resolve = resolve;
    });
}

var TaskCompletionSource$ = {
    setResult: function (result) {
        if (!this._isCompleted) {
            this._isCompleted = true;
            this._resolve(result);
        }
    },
    setException: function (exception) {
        if (!this._isCompleted) {
            this._isCompleted = true;
            this._reject(exception);
        }
    },
    trySetResult: function (result) {
        if (!this._isCompleted) {
            this._isCompleted = true;
            this._resolve(result);
            return true;
        }
        return false;
    },
    trySetException: function (exception) {
        if (!this._isCompleted) {
            this._isCompleted = true;
            this._reject(exception);
            return true;
        }
        return false;
    },
};