export class Lazy{
    factory: () => any;
    isValueCreated: boolean;
    value: any;

    constructor(factory: () => any){
        this.factory = factory;
        this.isValueCreated = false;
        this.value = undefined;
    }

    get IsValueCreated(){
        return this.isValueCreated;
    }

    get Value(){
        if (!this.isValueCreated) {
            this.value = this.factory();
            this.isValueCreated = true;
        }
        return this.value;
    }
}
