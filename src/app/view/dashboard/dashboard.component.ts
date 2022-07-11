import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserIn } from 'src/app/model/user-in';
import { AuthService } from 'src/app/service/auth.service';
import { ChatMsgService } from 'src/app/service/chat-msg.service';
import { Chat } from 'src/app/model/chat';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/model/contact';

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


  isBtnAdd: boolean = false;
  isBtnShowContact = false;
  contactForm: FormGroup;
  customNameField: FormControl;
  usernameField: FormControl;

  constructor(
    private chatMsgService: ChatMsgService, 
    private auth: AuthService, 
    private router: Router) {

      this.usernameField = new FormControl('', [Validators.required]);
      this.customNameField = new FormControl('', [Validators.required]);
  
      this.contactForm = new FormGroup({
        username: this.usernameField,
        name: this.customNameField
      });


      this.isBtnShowContact = false
      // this.newChatId = ''

  }

    

  ngOnInit(): void {
    this.auth.navbarOn()
    if(!this.auth.isLoggedIn) {
      this.router.navigate(['login']);
    } else {

    this.chatMsgService.getAllUserInfo().subscribe(
      {
        next: (data) => {
        console.log('DE DATA', data);
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
        console.log('this.userInfo', this.userInfo)
        this.router.navigate(['/dashboard']); 
      },
      error: (data) => {
          console.log(data)
          // this.invalidLogin = true;
        }
      });
    }
  }

  toggleAddBtn() {
    this.isBtnAdd = !this.isBtnAdd;
  }

  thoggleShowBtn() {
    this.isBtnShowContact = !this.isBtnShowContact;
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

  getPeerUsernameFromDB(peerId: number){
  
  }

  findPeerUSerName(peerId: number): string{
    console.log("--------------------------------------------------------------------")
    this.chatMsgService.getPeerUsername(peerId).subscribe(
      response => {
        console.log('responsedel nombreeeeeee', response)
        return response
    })
    return "no che"

  }
  
  onSubmit(){
    this.chatMsgService.addContact(new Contact(0, this.usernameField.value, this.customNameField.value)
    ).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.toggleAddBtn()
          // this.auth.saveUserInfo(data);
          // this.router.navigate(['/dashboard']); 
          this.ngOnInit()
        },
        error: (data) => {
          console.log("error", data)
        }
      });
  }
}
