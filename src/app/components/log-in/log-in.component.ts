import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { AuthTokenService } from 'src/app/services/authtoken.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class LogInComponent implements OnInit {
  selected: any = [];
  Roles: any = ['Admin', 'Agent'];
  authForm: FormGroup;
  loginRequestObj = {
    user_name: '',
    password: ''
};
userState: any = {
  name: '',
  token: ''
};

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private tokenService: AuthTokenService,
              private snackBar: MatSnackBar
      ) {
    this.authForm = this.fb.group({
      userName: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.authForm.invalid === false) {
      this.loginRequestObj.user_name = this.authForm.get('userName').value;
      this.loginRequestObj.password = this.authForm.get('password').value;
      this.loginService.loginAction(this.loginRequestObj).subscribe(data => {
        if (data && data.status && data.data && data.data.remember_token ) {
          if (data.data.remember_token) {
            this.userState.name = this.loginRequestObj.user_name;
            this.userState.token = data.data.remember_token;
            this.tokenService.setToken(this.userState);
            this.router.navigate(['/dashboard']);
          } else {

            localStorage.setItem('user', null);
          }
        } else {
          this.snackBar.open('Username/Password Error', 'Ok', {
            duration: 5000,
          });
        }
      });
    }
  }

  ngOnInit() {
  }

}
