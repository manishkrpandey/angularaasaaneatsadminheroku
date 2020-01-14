import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${url}`, { params });
  }

  put(url: string, body: object = {}): Observable<any> {
    return this.http.put(`${url}`, JSON.stringify(body));
  }

  post(url: string, body: object = {}): Observable<any> {
    return this.http.post(`${url}`, JSON.stringify(body));
  }

  delete(url: string, body: object = {}): Observable<any> {
    return this.http.request('delete', url, { body });
    // return this.http.delete(
    //   `${url}`,
    // );
  }
}
