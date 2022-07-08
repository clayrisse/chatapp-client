import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserIn } from 'src/app/model/user-in';
import { AuthService } from 'src/app/service/auth.service';
import { ChatMsgService } from 'src/app/service/chat-msg.service';
import { Chat } from 'src/app/model/chat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userInfo: UserIn = new UserIn (0, '', '', [], '', '', [], [], '')
  // userInfo: UserIn = new UserIn (0, '', '', '', [], [], '')
  chatList: Chat[] = [];
  peerUsername: string = '';
  newChatId: number = 0;

  constructor(
    private chatMsgService: ChatMsgService, 
    private auth: AuthService, 
    private router: Router) {

      // this.newChatId = ''

    }

    findPeerUsername() {
      this.chatMsgService.openChatRoomWith(this.peerUsername).subscribe (
        res => {
          this.newChatId = res.id
          console.log('new room DATA', res);
          this.ngOnInit();
          this.router.navigate(['/chat/' + this.newChatId]);
          console.log('this.peerUsername', this.peerUsername)
        }
      )
      // this.router.navigate(['/chat/' + this.newChatId]);
    }

  ngOnInit(): void {
    if(!this.auth.isLoggedIn) {
      this.router.navigate(['login']);
    } else {

      this.chatMsgService.getAllUserInfo().subscribe(
        {
          next: (data) => {
          console.log('DE DATA', data);
          // const {id, } = data
          const superUser = new UserIn(
            data.id,
            data.username, 
            data.password, 
            data.roles, 
            data.profileName, 
            data.profileImg, 
            data.contactList, 
            data.chatList, 
            data.lastSeen)
            console.log('superUser', superUser)
            this.userInfo = superUser;
          // this.auth.saveUserInfo(data);
          this.router.navigate(['/dashboard']); 
        },
        error: (data) => {
            console.log(data)
            // this.invalidLogin = true;
          }
        });
      }
    }
  }
