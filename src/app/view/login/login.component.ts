import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  usernameField: FormControl;
  passwordField: FormControl;
  invalidLogin: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
    this.usernameField = new FormControl('', [Validators.required]);
    this.passwordField = new FormControl('', [Validators.required]);

    this.form = new FormGroup({
      username: this.usernameField,
      password: this.passwordField
    });

  }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log("1111")
    this.auth.loginUser(new User(
      this.usernameField.value, this.passwordField.value)
    ).subscribe(
      {
        next: (data) => {
          console.log("first")
          console.log(data);
          this.auth.saveUserInfo(data);
          this.router.navigate(['']); 
        },
        error: (data) => {
          console.log(data)
          this.invalidLogin = true;
        }
      });

  }
}
