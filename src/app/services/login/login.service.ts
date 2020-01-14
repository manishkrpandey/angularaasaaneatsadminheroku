import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retryWhen } from 'rxjs/operators';
import { ApiService, } from 'src/app/services/api.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loading = false;
  loginUrl = 'http://www.dealbytes.co.in/admin/login';

  constructor(private api: ApiService) {

  }

  loginAction(requestObj): any {
    return this.api.post(this.loginUrl, requestObj).pipe(
      tap(data => {
        this.loading = false;
      }),
      catchError(err => err)
    );
  }

}