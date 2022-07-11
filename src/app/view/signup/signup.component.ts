import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  usernameField: FormControl;
  passwordField: FormControl;
  invalidLogin: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
    this.usernameField = new FormControl('', [Validators.required]);
    this.passwordField = new FormControl('', [Validators.required, Validators.minLength(7)]);

    this.form = new FormGroup({
      username: this.usernameField,
      password: this.passwordField,
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.auth.signupUser(new User(
      this.usernameField.value, this.passwordField.value)
    ).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.auth.saveUserInfo(data);
          this.router.navigate(['/dashboard']); 
        },
        error: (data) => {
          console.log(data)
          this.invalidLogin = true;
        }
      });
  }
}
