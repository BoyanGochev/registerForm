import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const baseURL = environment.baseURL;
const appSecret = environment.appSecret;
const appKey = environment.appKey;
const appMasterSecret = environment.appMasterSecret;



@Injectable({
  providedIn: 'root'
})
export class UserValidatorsService {

  myUsername;

  get httpMasterOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${appKey}:${appMasterSecret}`)}`,
        'Content-Type': 'application/json'
      })
    };
  }

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) {
    this.myUsername = sessionStorage.getItem('name') || localStorage.getItem('name');
   }

  checkEmail(email: any) {
    return this.http.get(`${baseURL}/${appKey}`, this.httpMasterOptions)
      .pipe(
        map((users: Array<any>) => users.filter((user) => user.email === email)),
        map(users => !!users.length)
      );
  }

  checkUser(username: any) {
    return this.http.get(`${baseURL}/${appKey}`, this.httpMasterOptions)
      .pipe(
        map((users: Array<any>) => users.filter((user) => user.username === username)),
        map(users => !!users.length)
      );
  }

  checkEditUser(username: any) {
    return this.http.get(`${baseURL}/${appKey}`, this.userService.httpKinveyOptions)
      .pipe(
        map((users: Array<any>) => users.filter((user) => user.username === username)),
        map((users: Array<any>) => users.filter((user) => user.username !== this.myUsername)),
        map(users => !!users.length)
      );
  }

}
