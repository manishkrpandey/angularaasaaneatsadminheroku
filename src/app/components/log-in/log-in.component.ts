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
  authOTPForm: FormGroup;
  loginRequestObj = {
    user_name: '',
    password: ''
};
otpReqObject = {
  otp:'',
  mobile_number:'',
  remember_token:''
}
userState: any = {
  name: '',
  token: ''
};
isRequestedOTP:any = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private tokenService: AuthTokenService,
              private snackBar: MatSnackBar
      ) {
    this.authForm = this.fb.group({
      userName: ['', Validators.required],
      mNumber: [null, [Validators.required]],
      password: ['', Validators.required],
      userType: ['', Validators.required]
    });
    this.authOTPForm = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.authForm.invalid === false) {
      this.loginRequestObj.user_name = this.authForm.get('userName').value;
      this.loginRequestObj.password = this.authForm.get('password').value;
      this.loginService.loginAction(this.loginRequestObj).subscribe(data => {
        if (data && data.status && data.data && data.data.otp ) {
          this.snackBar.open('OTP is ' + data.data.otp, 'Ok', {
            duration: 5000,
          });
          this.isRequestedOTP =  true;
        } else {
          this.snackBar.open('Username/Password Error', 'Ok', {
            duration: 5000,
          });
        }
      });
    }
  }


  submitOTPForm() {
    if (this.authOTPForm.invalid === false) {
      this.otpReqObject.otp = this.authOTPForm.get('otp').value;
      this.otpReqObject.mobile_number = this.authForm.get('mNumber').value;
      this.otpReqObject.remember_token = "new_token",
      this.loginService.verifyOtp(this.otpReqObject).subscribe(data => {
        if (data && data.status && data.data && data.data ) {
          this.tokenService.setToken('token');
          this.router.navigate(['/dashboard']);
        } else {
          this.snackBar.open('OTP Error', 'Ok', {
            duration: 5000,
          });
        }
      });
    }
  }

  ngOnInit() {
  }

}
