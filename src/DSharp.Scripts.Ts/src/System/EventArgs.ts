export class EventArgs{
  public static Empty: EventArgs = new EventArgs();
}

export class CancelEventArgs extends EventArgs{
  cancel: boolean;
  constructor(){
    super();
    this.cancel = false;
  }
}