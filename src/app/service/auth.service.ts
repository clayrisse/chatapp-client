import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserIn } from '../model/user-in';

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

  loginUser(user: User): Observable<UserIn> {
    this.username = user.username;
    this.password = user.password;
    //   const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    //   })
    // };

    // return this.http.get<UserIn>(this.rootUrl + '/login',  httpOptions);
    return this.http.get<UserIn>(this.rootUrl + '/login',  this.getAuthHeaders());

  }
  getAuthHeaders(): Object {
    console.log('el header is: ', this.username + ':' + this.password, 'this.isLoggedIn', this.isLoggedIn)
    return { 
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      })
    }
  }


  saveUserInfo(user: UserIn) {

    localStorage.setItem('username', this.username);
    localStorage.setItem('password', this.password);
    this.isLoggedIn = true;
    console.log(localStorage.getItem('username'));
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.isLoggedIn = false;
  }

  restoreSession() {
    if (localStorage.getItem('username') != null ) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem('username')!
      this.password = localStorage.getItem('password')!
    }
  }
}
