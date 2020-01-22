import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retryWhen } from 'rxjs/operators';
import { ApiService, } from 'src/app/services/api.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  loading = false;
  loginUrl = 'http://www.dealbytes.co.in/admin/registeremployee';
  getAllUserDetailsUrl = 'http://www.dealbytes.co.in/admin/registeremployee';
  getEmployeeUrl = 'http://www.dealbytes.co.in/employee/retrieve?id=1';

  constructor(private api: ApiService) {

  }

  addNewUser(requestObj): any {
    return this.api.post(this.loginUrl, requestObj).pipe(
      tap(data => {
        this.loading = false;
      }),
      catchError(err => err)
    );
  }

  getAllUserDetails(requestObj) {
    return this.api.post(this.getAllUserDetailsUrl, requestObj).pipe(
      tap(data => {
        this.loading = false;
      }),
      catchError(err => err)
    );
  }

  getAllMarkettingEmployee() {
    const headers = new HttpParams();
    headers.set('id', '1');
    return this.api.get(this.getEmployeeUrl);
  }

}
