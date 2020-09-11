export class Exception extends Error{
    private _message: string | undefined = undefined;

    constructor(message?: string){
        super();
        this._message = message;
    }

    get Message(){
        return this._message;
    }
}