import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsgOut } from 'src/app/model/msg-out';
import { ChatMsgService } from 'src/app/service/chat-msg.service';

@Component({
  selector: 'app-message-writer',
  templateUrl: './message-writer.component.html',
  styleUrls: ['./message-writer.component.scss']
})
export class MessageWriterComponent implements OnInit {

  
  // msgForm: FormGroup;
  // messageField: FormControl;
  // passwordField: FormControl;
  // invalidLogin: boolean = false;

  msgContent: string;
  @Output()
  sendMsgEvent = new EventEmitter<string>();

  constructor(private router: Router, private msgService: ChatMsgService) {
    // this.messageField = new FormControl('', [Validators.required]);
    // this.msgForm = new FormGroup({
    //   message: this.messageField
    // });

    this.msgContent = '';
  }
//-----------------------------falta ver lo de abajo \/ \/ \/ \/ \/
  ngOnInit(): void {
  }

  sendMsgJr() {
    this.sendMsgEvent.emit(this.msgContent);
  }



  // onSubmit() {
    // console.log("1111")
    // this.msgService.sendMsg(new MsgOut(
    //   this.usernameField.value, this.passwordField.value)
    // ).subscribe(
    //   {
    //     next: (data) => {
    //       console.log("first")
    //       console.log(data);
    //       this.auth.saveUserInfo(data);
    //       this.router.navigate(['']); 
    //     },
    //     error: (data) => {
    //       console.log(data)
    //       this.invalidLogin = true;
    //     }
    //   });

  // }

}
