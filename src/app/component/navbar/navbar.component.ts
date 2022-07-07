import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  isLoggedIn : boolean = false;


  constructor(private auth : AuthService, private route: Router) { }

  ngOnInit(): void {
    this.auth.restoreSession();
    this.isLoggedIn = this.auth.isLoggedIn;
  }

  logout() {
    this.auth.logout();
    this.ngOnInit();
    this.route.navigate(['/login']);
    
  }

}
