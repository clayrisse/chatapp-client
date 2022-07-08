import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ChatMsgService } from 'src/app/service/chat-msg.service';
import { Chat } from 'src/app/model/chat';
import { MsgOut } from 'src/app/model/msg-out';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  chat: Chat = new Chat(0, 0, []);
  chatId: number = this.route.snapshot.params["chatId"];
 

  constructor(
    private chatMsgService: ChatMsgService, 
    private auth: AuthService,
    private router: Router, 
    private route: ActivatedRoute) { 
      
      this.chatId = this.route.snapshot.params["chatId"];
  }

  ngOnInit(): void {
  
    this.chatMsgService.getChatbyId(this.chatId).subscribe(
      res => {
        this.chat = new Chat(res.id, res.peerId, res.msgList)
        console.log('this.chat', this.chat)
    })
  }

  sendMsgSr(msgContent: string) {
  console.log('msgContent', msgContent)
  const msgOut = new MsgOut (this.chat.peerId, msgContent, String(Date.now()))
  
  this.chatMsgService.sendMessage(msgOut).subscribe(
    res=> {
      console.log('res', res)
    }
  )

  }


}
