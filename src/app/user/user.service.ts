import { Injectable, Output, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  isWrong: boolean;

  baseURL = 'https://baas.kinvey.com/user';
  appSecret = '134b0d578bb14983843806324482d91c';
  appKey = 'kid_Hk_o7oWrI';

  httpBasicOptions = {
    headers: new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.appKey}:${this.appSecret}`)}`,
      'Content-Type': 'application/json'
    })
  };

  httpKinveyOptions = {
    headers: new HttpHeaders({
      Authorization: `Kinvey ${sessionStorage.getItem('authtoken')}`,
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private router: Router) { }

  login(input: object) {
    this.isWrong = false;
    return this.http.post(`${this.baseURL}/${this.appKey}/login`, JSON.stringify(input), this.httpBasicOptions);      // .subscribe({
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  register(input: any) {
    const data = {
      username: input.username,
      email: input.email,
      phone: input.phone,
      country: input.country,
      password: input.passwords.password
    };
    return this.http.post(`${this.baseURL}/${this.appKey}`, JSON.stringify(data), this.httpBasicOptions).subscribe(res => {
      console.log(res);
    });

  }

  getUserInfo(){
    
  }


  sethAuthInfo(userInfo) {
    sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
    sessionStorage.setItem('name', userInfo.username);
    sessionStorage.setItem('userId', userInfo._id);

  }

}
