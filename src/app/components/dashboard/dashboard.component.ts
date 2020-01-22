import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from 'src/app/services/dasboard/dashboard.service';
import { AuthTokenService } from 'src/app/services/authtoken.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userDetailsObj = [];
  addNewUserRequestObject = {
    command: 'insert',
    remember_token: 'new_token',
    mobile_number: '981103',
    employee_type_id: '1',
    employee_name: 'jamwant yadav',
    email_id: 'jamwant@gmail.com'
};
authToken: any = '';
getAllUserDetailsRequestObject =  {
  command: 'retrieve',
  remember_token: this.authToken ? this.authToken : '',
};


  constructor(
    private formBuilder: FormBuilder,
    conRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dashboardService: DashboardService,
    private tokenService: AuthTokenService,
    private router: Router,
    private snackBar: MatSnackBar

    ) {
      this.authToken = this.tokenService.getToken();
      this.getAllUserDetailsRequestObject.remember_token = this.addNewUserRequestObject.remember_token = this.authToken;

     }
  formGroup: FormGroup;
  selected = 'option2';
  userFilter: any = { employee_name: '' };
  userLabel = [
    {label: 'Name', icon: 'face', key: 'employee_name'},
   {label: 'Contact Number', icon: 'contact_phone', key: 'mobile_number'},
   {label: 'Area', icon: 'house', key: ''},
   {label: 'Email Add', icon: 'email', key: 'email_id'},
   {label: 'Team', icon: 'supervised_user_circle', key: ''}];

  step = 0;

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      employeeType: ['', Validators.required],
      email: ['', Validators.required]

    });
    this.getAllUserDetails();
    this.getAgentCount();
  }

  AddNewuser() {
    if (this.formGroup.valid) {
      this.addNewUserRequestObject.email_id = this.formGroup.get('email').value;
      this.addNewUserRequestObject.employee_type_id = this.formGroup.get('employeeType').value;
      this.addNewUserRequestObject.employee_name = this.formGroup.get('userName').value;
      this.addNewUserRequestObject.mobile_number = this.formGroup.get('mobileNumber').value;
      this.dashboardService.addNewUser(this.addNewUserRequestObject).subscribe(data => {
        if (data && data.status ) {
          this.formGroup.reset();
          this.snackBar.open('User Added Sucessfully', 'Success', {
            duration: 5000,
          });
          this.getAllUserDetails();
        } else {
          this.snackBar.open('User Not  Added Sucessfully', 'Fail', {
            duration: 5000,
          });
        }
      });
    }
  }

  getAgentCount() {
    this.dashboardService.getAllMarkettingEmployee().subscribe(data => {console.log(data);});
  }

  getAllUserDetails() {
    this.dashboardService.getAllUserDetails(this.getAllUserDetailsRequestObject).subscribe(data => {
      if (data && data.status === 'success') {
        this.userDetailsObj = data.data;
      } else {
        // this.router.navigate(['\login']);
      }
    });
  }

  getColor(status) {
    console.log(status);
  }

  getError(el) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('userName').hasError('required')) {
          return 'Username required';
        }
        break;
      case 'pass':
        if (this.formGroup.get('mobileNumber').hasError('required')) {
          return 'Mobile Number required';
        }
        break;
        case 'email':
          if (this.formGroup.get('email').hasError('required')) {
            return 'Email required';
          }
          break;
      default:
        return '';
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onSubmit(post) {
    // this.post = post;
  }


}
