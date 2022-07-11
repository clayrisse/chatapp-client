import { Chat } from "./chat";
import { Contact } from "./contact";

export class UserIn {

  constructor(
    
    private _id: number = 0,
    private _username: string = '',
    private _password: string = '',
    private _roles: string[] = [],

    private _profileName: string = '',
    private _profileImg: string ='',
    private _contactList: Contact [] = [],
    private _chatList: Chat[] = [],
    
    private _lastSeen: string = ''

){
}

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }
  
  get username(): string { return this._username; }
  set username(value: string) { this._username = value; }
  
  get password(): string { return this._password; }
  set password(value: string) { this._password = value; }
  
  get roles(): string[] { return this._roles; }
  set roles(value: string[]) { this._roles = value; }
  
  get profileName(): string { return this._profileName; }
  set profileName(value: string) { this._profileName = value; }
  
  get profileImg(): string { return this._profileImg; }
  set profileImg(value: string) { this._profileImg = value; }
  
  get contactList(): Contact[] { return this._contactList; }
  set contactList(value: Contact[]) { this._contactList = value; }
  
  get chatList(): Chat[] { return this._chatList; }
  set chatList(value: Chat[]) { this._chatList = value; }
  
  get lastSeen(): string { return this._lastSeen; }
  set lastSeen(value: string) { this._lastSeen = value; }

}
