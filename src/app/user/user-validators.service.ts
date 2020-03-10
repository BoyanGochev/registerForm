import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class UserValidatorsService {


  baseURL = 'https://baas.kinvey.com/user';
  appSecret = '134b0d578bb14983843806324482d91c';
  appKey = 'kid_Hk_o7oWrI';
  appMasterSecret = '56d6e0ec09374e12a3db7e022579cd08';

  get httpMasterOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${this.appKey}:${this.appMasterSecret}`)}`,
        'Content-Type': 'application/json'
      })
    };
  }

  constructor(
    private userService: UserService,
    private http: HttpClient
  ) { }

  checkEmail(email: any) {
    return this.http.get(`${this.baseURL}/${this.appKey}`, this.httpMasterOptions)
      .pipe(
        map(users => users.filter((user) => user.email === email)),
        map(users => !!users.length)
      );
  }

  checkUser(username: any) {
    return this.http.get(`${this.baseURL}/${this.appKey}`, this.httpMasterOptions)
      .pipe(
        map(users => users.filter((user) => user.username === username)),
        map(users => !!users.length)
      );
  }

  checkEditUser(username: any) {
    return this.http.get(`${this.baseURL}/${this.appKey}`, this.userService.httpKinveyOptions)
      .pipe(
        map(users => users.filter((user) => user.username === username)),
        map(users => !!users.length)
      );
  }



}
