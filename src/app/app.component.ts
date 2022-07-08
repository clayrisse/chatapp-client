import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chatapp-client';

  constructor(private auth: AuthService) {
    
  }

  ngOnInit () {
    this.auth.restoreSession();
  }
}
