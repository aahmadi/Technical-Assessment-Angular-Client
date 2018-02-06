import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Event } from '@angular/router/src/events';
import { EventEmitter } from 'events';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInvalid = false;

  // Form
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private router: Router, private authService: AuthService) {
   }

   login() {
     if (this.loginForm.valid) {
        this.loginInvalid = false;
        let creds: ILoginCredentials = {
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value
       };
       this.authService.login(creds)
       .subscribe(resp => {if (!resp) {
         this.loginInvalid = true;
       } else {
        this.router.navigate(['plans']);
       }});
     }
   }

   validateUsername() {
     return this.loginForm.controls.username.valid ||
     this.loginForm.controls.username.untouched;
   }

   validatePassword() {
    return this.loginForm.controls.password.valid ||
    this.loginForm.controls.password.untouched;
  }
  
  ngOnInit() {
  }

}
