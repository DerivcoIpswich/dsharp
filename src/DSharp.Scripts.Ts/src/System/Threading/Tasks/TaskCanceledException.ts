import { Exception } from "../../Exception";

export class TaskCanceledException extends Exception{
    constructor(){
        super("A task was canceled");
    }
}