import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';


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

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.authForm = this.fb.group({
      userName: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userType: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.authForm.invalid === false) {
      console.log('submitted');
      this.loginRequestObj.user_name = this.authForm.get('userName').value;
      this.loginRequestObj.password = this.authForm.get('password').value;
      this.loginService.loginAction(this.loginRequestObj).subscribe(data => {
        if (data && data.status ) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  ngOnInit() {
  }

}
