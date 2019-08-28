# Generics fixes:

- Make generic methods with args take an argument map in to execute, and change how generic method invocation works:
    ```
    function doSomething(TArgs, num){
        return TArgs["T"]
    }

    doSomething({T: Number}, num);
    ```
- Allow Passing generic Arguments as another Generic Argument
- Look at rewriting class level generics to invoke with type argument map?
- Allow writing GenericType args map in `ExpressionGenerator.GenerateGenericTypeArguments`