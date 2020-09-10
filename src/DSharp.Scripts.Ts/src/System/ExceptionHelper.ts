import { paramsGenerator } from "./Misc";
import { emptyString } from "./String";

export class ExceptionHelper{
    static throwAggregateException = function(exceptions: Error[]) {
        var aggregateException = new Error('One or more errors occurred.');
        ExceptionHelper._addReadonlyProperty(aggregateException, 'innerExceptions', exceptions);
        return aggregateException;
      };
      static throwArgumentNullException = function(argumentName) {
        var argumentNullException = new Error('Value cannot be null.\r\nParameter name: ' + argumentName);
        ExceptionHelper._addReadonlyProperty(argumentNullException, 'argumentName', argumentName);
        return argumentNullException;
      };
      static throwArgumentOutOfRangeException = function(paramName) {
        var argumentOutOfRangeException = new Error('Specified argument was out of the range of valid values.\r\nParameter name: ' + paramName);
        ExceptionHelper._addReadonlyProperty(argumentOutOfRangeException, 'argumentName', paramName);
        return argumentOutOfRangeException;
      };
      static throwOverflowException = function(message) {
        return new Error('Overflow Exception.\r\nMessage: ' + message);
      };
      static throwInvalidOperationException = function(message) {
        return new Error('Invalid Operation Occured.\r\nMessage: ' + message);
      };
      static _addReadonlyProperty = function(instance, propertyName, propertyValue) {
        if (instance == null || emptyString(propertyName)) {
          return;
        }
        Object.defineProperty(instance, propertyName, {
            value: propertyValue,
            enumerable: true
        });
      };
}