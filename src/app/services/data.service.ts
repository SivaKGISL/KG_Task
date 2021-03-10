import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { timeout, catchError, finalize } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { _throw } from 'rxjs/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  sendGetRequest(endPoint?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    };
    let serviceEndPoint = environment.url + endPoint
    return this.http.get(serviceEndPoint, httpOptions)
  }
  
  sendPostRequest(body: any,endPoint?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    };
    let serviceEndPoint = environment.url + endPoint;
    return this.http.post(serviceEndPoint, body, httpOptions)
      .pipe(
        timeout(60000),
        catchError((e, c) => { 
          console.log(e);
          return _throw(e) }),
        finalize(() => { 
          console.log('finalize') 
        })
      )
      .toPromise()
      .then((res: any) => {
        return res;
      })
      .catch((error: any) => {
        let errorData: any =null;
        if (error.status === 0 && error.ok === false) {
            errorData = "Please check your internet connectivity"
        } else if(error.name === 'TimeoutError') {
          errorData = "Sorry, your request has been timed out, please check"
        }
        console.log('this.http.post(serviceEndPoint, body, httpOptions)',errorData)
        return Promise.reject(errorData);
      });
  }
}
