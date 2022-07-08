import { Injectable } from '@angular/core';
import { UserIn } from '../model/user-in';
import { Chat } from '../model/chat';
import { MsgIn } from '../model/msg-in';
import { MsgOut } from '../model/msg-out';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Messa}

@Injectable({
  providedIn: 'root'
})

export class ChatMsgService {

  readonly rootUrl = 'http://localhost:8080';

  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;


  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllUserInfo(): Observable<UserIn> {
    return this.http.get<UserIn>(this.rootUrl + '/me', this.auth.getAuthHeaders());
  }

  getPeerUsername(peerId: number): Observable<string> {
    return this.http.get<string>(this.rootUrl + '/username/'+peerId,  this.auth.getAuthHeaders())
  }

  getChatbyId(chatId: number): Observable<Chat> {
    return this.http.get<Chat>(this.rootUrl + '/chatter/chat/' + chatId, this.auth.getAuthHeaders())
  }
  
  sendMessage(msgOut: MsgOut): Observable<MsgIn> {
    return this.http.post<MsgIn>(this.rootUrl + 'chatter/msg/', msgOut, this.auth.getAuthHeaders())

  }

}
