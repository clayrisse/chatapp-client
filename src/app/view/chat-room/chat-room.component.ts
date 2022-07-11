import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ChatMsgService } from 'src/app/service/chat-msg.service';
import { Chat } from 'src/app/model/chat';
import { MsgOut } from 'src/app/model/msg-out';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  chat: Chat = new Chat(0, 0, []);
  chatId: number;

  stompClient!: Stomp.Client;
  currentUserId: number;
  intervalID: any;
  peerUsername: string;
 

  constructor(
    private chatMsgService: ChatMsgService, 
    private auth: AuthService,
    private router: Router, 
    private route: ActivatedRoute) {
      this.peerUsername = '';
      this.currentUserId = 0;
      this.chatId = this.route.snapshot.params["chatId"];
  }

  ngOnInit(): void {
    // user esto para simular las llamadas continuas del websocket
    // this.intervalID = setInterval(this.getChatHistory, 1500);
    this.getChatHistory()
    console.log( "PEER USERNNAME1111", this.chat.peerId)
    this.chatMsgService.getPeerUsername(this.chat.peerId).subscribe(
      res => {
        console.log( "PEER USERNNAME", res)
        this.peerUsername = res
      }
    )
  }

  goBackAndRemoveSetInterval() {
    clearInterval(this.intervalID)    
    this.router.navigate(['/dashboard']); 
  }


  getChatHistory = () => {
    this.chatMsgService.getChatbyId(this.chatId).subscribe(
      res => {
        console.log('REVISA EL SENDER IDS', res)
        this.chat = new Chat(res.id, res.peerId, res.msgList, res.senderId)
        this.currentUserId = res.senderId
        console.log('this.chat', this.chat)
        // if (this.peerUsername == '') {
          this.chatMsgService.getPeerUsername(this.chat.peerId).subscribe(
            res => {
              console.log( "PEER USERNNAME....", res)
              this.peerUsername = res
            }
          )
        // }
        // this.connect(); // oncomment to use socket
    })
  }

  sendMsgSr(msgContent: string) {
    console.log('msgContent', msgContent)
    if (msgContent != '') {
      const msgOut = new MsgOut (this.chat.peerId, msgContent, String(Date.now()), this.chat.senderId)
      this.chatMsgService.sendMessage(msgOut).subscribe(
        res=> {
          console.log('res', res)
          // this.ngOnInit();
        }
      )
    }
  }



 
  removeMessage(id: number) {
    console.log("quiero borrar")
    this.chatMsgService.removeMessage(id).subscribe(
      res=> {
        console.log('res', res)
        // this.ngOnInit();
      }
    )
  }
  


// / \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ \/ Socket related


  connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe("/user/" + _this.chat.senderId + "/queue/messages", function(hello){
        console.log(JSON.parse(hello.body));
        // _this.showMessage(JSON.parse(hello.body));
        _this.chat.msgList.push(JSON.parse(hello.body))
      });
    });
   }

  sendSocketMessage(message:string) {
    console.log('this', this.currentUserId)
    console.log('message', message)
    const msgOut = new MsgOut (this.chat.peerId, message, String(Date.now()), this.chat.senderId)
    this.stompClient.send('/app/chat', {}, JSON.stringify(msgOut)
    );
  }

}
