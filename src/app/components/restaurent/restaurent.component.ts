import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from 'src/app/services/dasboard/dashboard.service';
import { AuthTokenService } from 'src/app/services/authtoken.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-restaurent',
  templateUrl: './restaurent.component.html',
  styleUrls: ['./restaurent.component.css']
})
export class RestaurentComponent implements OnInit {
  userDetailsObj = [];
  dialogRefSubscription: Subscription;
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
    private snackBar: MatSnackBar,
    public dialog: MatDialog

    ) {
      this.authToken = this.tokenService.getToken();
      this.getAllUserDetailsRequestObject.remember_token = this.addNewUserRequestObject.remember_token = this.authToken;

     }
  formGroup: FormGroup;
  selected = 'option2';
  userFilter: any = { employee_name: '' };
  userLabel = [
    {label: 'Name', icon: 'face', key: 'restaurant_name'},
   {label: 'Contact Number', icon: 'contact_phone', key: 'mobile_number'},
   {label: 'Area', icon: 'house', key: 'address'},
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
    this.dashboardService.getAllMarkettingEmployee().subscribe(data => {console.log(data); });
  }

  getAllUserDetails() {
    this.dashboardService.getAllRestaurent().subscribe(data => {
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

  openDialog(action, mNumber) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        action,
        mNumber
      }
    });

    this.dialogRefSubscription = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.action === 'delete') {
          console.log('deleting user');
        } else if (result.action === 'verify') {
          console.log('changing status to verified');
        }
      }
    });
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

  onSubmit(post) {
    // this.post = post;
  }

}
