import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router, private auth: AuthService) {
  }
  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['plans']);
    } else {
      this.router.navigate(['login']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  login() {
    this.router.navigate(['login']);
  }

  showLogoutBtn() {
    return this.auth.isAuthenticated();
  }
}
