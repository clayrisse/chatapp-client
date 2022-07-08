export class MsgOut {

  constructor(
    private _receiverId: number = 0,
    private _content: string = '',
    private _timestamp: string  = String(Date.now())
  ) {}

  get receiverId(): number { return this._receiverId; }
  set receiverId(value: number) { this._receiverId = value; }
  
  get content(): string { return this._content; }
  set content(value: string) { this._content = value; }
  
  get timestamp(): string { return this._timestamp; }
  set timestamp(value: string) { this._timestamp = value; }

}
