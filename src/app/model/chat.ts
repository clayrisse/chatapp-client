import { MsgIn } from "./msg-in";
import { User } from "./user";
import { UserIn } from "./user-in";

export class Chat {

  constructor(
    private _id: number = 0,
    private _peerId: number = 0,
    private _msgList: MsgIn [] = [],
    private _senderId: number = 0
    // , private _userOwner: UserIn = new UserIn(0,'','',[],'','',[],[],'')
  
  ){
  }
  
  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }
  
  get peerId(): number { return this._peerId; }
  set peerId(value: number) { this._peerId = value; }
  
  get msgList(): MsgIn[] { return this._msgList; }
  set msgList(value: MsgIn[]) { this._msgList = value; }
    
  get senderId(): number { return this._senderId; }
  set senderId(value: number) { this._senderId = value; }
  
  // get userOwner(): UserIn { return this._userOwner; }
  // set userOwner(value: UserIn) { this._userOwner = value; }
}
