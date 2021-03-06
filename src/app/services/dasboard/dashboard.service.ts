import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retryWhen } from 'rxjs/operators';
import { ApiService, } from 'src/app/services/api.service';
import { environment  as env} from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  loading = false;
  loginUrl = env.BASE_URL + '/admin/registeremployee';
  getAllUserDetailsUrl = env.BASE_URL + '/admin/registeremployee';
  getEmployeeUrl = env.BASE_URL + '/employee/retrieve?id=1';
  getAllRestaurentUrl = env.BASE_URL + '/restaurant/retrieveall';

  constructor(private api: ApiService) {

  }

  addNewUser(requestObj): any {
    requestObj.remember_token = "new_token";
    return this.api.post(this.loginUrl, requestObj).pipe(
      tap(data => {
        this.loading = false;
      }),
      catchError(err => err)
    );
  }

  getAllUserDetails(requestObj) {
    requestObj.remember_token = "new_token";
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

  getAllRestaurent(){
    return this.api.get(this.getAllRestaurentUrl).pipe(
      tap(data => {
        this.loading = false;
      }),
      catchError(err => err)
    );
  }

}
