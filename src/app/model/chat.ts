import { MsgIn } from "./msg-in";

export class Chat {

  constructor(
      private _id: number = 0,
    private _peerId: number = 0,
    private _msgList: MsgIn [] = []
    // private userOwner: User = ,
  
  ){
    console.log('Date.now()', Date.now())
  }
  
  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }
  
  get peerId(): number { return this._peerId; }
  set peerId(value: number) { this._peerId = value; }
  
  get msgList(): MsgIn[] { return this._msgList; }
  set msgList(value: MsgIn[]) { this._msgList = value; }
  
}
