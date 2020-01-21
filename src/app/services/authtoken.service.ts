import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthTokenService {
  constructor() {}

  setToken(authObj) {
    localStorage.setItem('user', JSON.stringify(authObj));
  }

  getToken() {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData);
    return userData.token;
  }


}
