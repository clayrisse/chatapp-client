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
  // nameField: FormControl;
  // dateOfBirthField: FormControl;
  // jobField: FormControl;

  name: string = '';

  constructor(private auth: AuthService, private router: Router) {
    // Initialize Form Control fields
    this.usernameField = new FormControl('', [Validators.required]);
    this.passwordField = new FormControl('', [Validators.required, Validators.minLength(7)]);
    // this.nameField = new FormControl('', [Validators.required]);
    // this.dateOfBirthField = new FormControl('', [Validators.required]);
    // this.jobField = new FormControl('', [Validators.required]);


    // Initialzie Form Group
    this.form = new FormGroup({
      username: this.usernameField,
      password: this.passwordField,
      // name: this.nameField,
      // dateOfBirth: this.dateOfBirthField,
      // job: this.jobField
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
          this.router.navigate(['']); 
        },
        error: (data) => {
          console.log(data)
          // this.invalidLogin = true;
        }
      });
  }
}
