import { Enum } from "../../Enum";

export let TaskStatus = new Enum("TaskStatus", {
    created: 0, 
    waitingForActivation: 1, 
    waitingToRun: 2, 
    running: 3, 
    waitingForChildrenToComplete: 4, 
    ranToCompletion: 5, 
    canceled: 6, 
    faulted: 7
});