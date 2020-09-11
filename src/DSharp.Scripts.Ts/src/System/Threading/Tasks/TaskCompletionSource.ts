import { defineProperty } from "../../Properties";
import { createGenericType, getTypeArgument, getGenericConstructor } from "../../Generics";
import { Task_$1 } from "./Task";
import { isValue } from "../../../Helpers";
import { ExceptionHelper } from "../../ExceptionHelper";
import { CancellationToken } from "../CancellationToken";
import { canAssign, typeOf } from "../../../TypeSystem";
import { enumerate } from "../../Collections/Enumerator";
import { toArray } from "../../Collections/CollectionHelpers";
import { IEnumerable_$1 } from "../../SystemInterfaces";

export class TaskCompletionSource_$1 {
    Task: Task_$1;
    constructor(state?: any) {
        this.Task = createGenericType(Task_$1, { TResult: getTypeArgument(this, 'TResult') });
        if (!!isValue(state)) {
            this.Task.Result = state;
        }
    }

    setCanceled(token) {
        if (!this.trySetCanceled(token)) {
          throw ExceptionHelper.throwInvalidOperationException('TaskCompletionSource has already been transitioned to final state');
        }
      }
      trySetCanceled(cancellationToken) {
        if (!isValue(cancellationToken)) {
          cancellationToken = CancellationToken.None;
        }
        return this.Task._trySetCanceled(cancellationToken);
      }
      setException(exception) {
        if (!this.trySetException(exception)) {
          throw ExceptionHelper.throwInvalidOperationException('TaskCompletionSource has already been transitioned to final state');
        }
      }
      trySetException(exception) {
        if (canAssign(getGenericConstructor(IEnumerable_$1, {T: Error}), typeOf(arguments[0]))) {
          var exceptions = exception;
          var innerExceptions: any[] = [];
          var $enum1 = enumerate(exceptions);
          while ($enum1.moveNext()) {
            var innerException = $enum1.current;
            innerExceptions.push(innerException);
          }
          exception = ExceptionHelper.throwAggregateException(toArray(innerExceptions));
        }
        return this.Task._trySetException(exception);
      }
      setResult(result) {
        if (!this.trySetResult(result)) {
          throw ExceptionHelper.throwInvalidOperationException('TaskCompletionSource has already been transitioned to final state');
        }
      }
      trySetResult(result) {
        return this.Task._trySetResult(result);
      }
}