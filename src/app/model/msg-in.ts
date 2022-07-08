import { Chat } from "./chat";
import { MsgStatus } from "../enum/msg-status";

export class MsgIn {

  constructor(
    private _id: number = 0,
    private _senderId: number = 0,
    private _msgStatus: MsgStatus = MsgStatus.PENDING,
    private _chatList: Chat[] = [],
    private _receiverId: number = 0,
    private _content: string = '',
    private _timestamp: string  = String(Date.now())
  ) { console.log('Date.now()', Date.now()) }
  
    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }
    
    get senderId(): number { return this._senderId; }
    set senderId(value: number) { this._senderId = value; }
    
    get receiverId(): number { return this._receiverId; }
    set receiverId(value: number) { this._receiverId = value; }
    
    get content(): string { return this._content; }
    set content(value: string) { this._content = value; }
    
    get timestamp(): string { return this._timestamp; }
    set timestamp(value: string) { this._timestamp = value; }
    
    get msgStatus(): MsgStatus { return this._msgStatus; }
    set msgStatus(value: MsgStatus) { this._msgStatus = value; }
    
    get chatList(): Chat[] { return this._chatList; }
    set chatList(value: Chat[]) { this._chatList = value; }
    
}
