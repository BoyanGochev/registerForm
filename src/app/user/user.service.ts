import { Injectable, Output, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const baseURL = environment.baseURL;
const appSecret = environment.appSecret;
const appKey = environment.appKey;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  get httpBasicOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    };
  }

  get httpKinveyOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Kinvey ${sessionStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    };
  }

  constructor(private http: HttpClient, private router: Router) { }

  login(input: object) {
    return this.http.post(`${baseURL}/${appKey}/login`, JSON.stringify(input), this.httpBasicOptions);
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
    return this.http.post(`${baseURL}/${appKey}`, JSON.stringify(data), this.httpBasicOptions);

  }

  getUserInfo() {
    const id = sessionStorage.getItem('userId');
    return this.http.get(`${baseURL}/${appKey}/${id}`, this.httpKinveyOptions);
  }

  editUserInfo(input: any) {
    const id = sessionStorage.getItem('userId');
    const data = {
      username: input.username,
      email: input.email,
      phone: input.phone,
      country: input.country,
      password: input.passwords.password
    };
    return this.http.put(`${baseURL}/${appKey}/${id}`, JSON.stringify(data), this.httpKinveyOptions);
  }

  sethAuthInfo(userInfo) {
    sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
    sessionStorage.setItem('name', userInfo.username);
    sessionStorage.setItem('userId', userInfo._id);
  }

}
