import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly rootUrl = 'http://localhost:8080';

  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;



  constructor(private http: HttpClient) { }


  signupUser(user: User): Observable<any> {
    return this.http.post<User>(this.rootUrl + '/signup', user);
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  loginUser(user: User): Observable<any> {
    this.username = user.username;
    this.password = user.password;
      const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
        
      })
    };

    return this.http.get(this.rootUrl + '/login',  httpOptions);

  }

  saveUserInfo(user: any) {
    localStorage.setItem('username', user['username']);
    this.isLoggedIn = true;
    console.log(localStorage.getItem('username'));
  }

  logout() {
    localStorage.removeItem('username');
    this.isLoggedIn = false;
  }

  restoreSession() {
    if (localStorage.getItem('username') != null) {
      this.isLoggedIn = true;
    }
  }
}
