import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/model/chat';
import { AuthService } from 'src/app/service/auth.service';
import { ChatMsgService } from 'src/app/service/chat-msg.service';

@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.scss']
})
export class ChatPreviewComponent implements OnInit {

  @Input()
  chat: Chat = new Chat(0, 0, []);

  @Input()
  peer: string ='';

  @Input()
  index: number = 0;
  peerUsername: string = '';

  constructor(
    private chatMsgService: ChatMsgService, 
    private auth: AuthService, 
    private router: Router
  ) { 
    

  }

  ngOnInit(): void {
    console.log(this.chat.peerId, "llllllllllllllllllllllllllllllll")
    this.getPeerUsernameFromDB(this.chat.peerId);
    console.log("22222222222222222222")
  }
  
  getPeerUsernameFromDB(peerId: number){
    console.log("--------------------------------------------------------------------")
    this.chatMsgService.getPeerUsername(peerId).subscribe(
      response => {
        console.log('responsedel nombreeeeeee', response)
        this.peerUsername = response
    })
  }
}
