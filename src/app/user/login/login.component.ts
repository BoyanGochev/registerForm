import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isWrong: boolean;
  checked = true;


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() { }

  loginHandler(data: any) {
    this.userService.login(data).subscribe(
      (userInfo: any) => {

        if (this.checked) {
          this.userService.sethLocalStorageAuthInfo(userInfo);
        }

        this.userService.sethAuthInfo(userInfo);
        this.router.navigate(['/home']);
      },
      err => {
        if (err.status === 401) {
          this.isWrong = true;
        }
      }
    );
  }

  rememberMeHandler() {
    this.checked = !this.checked;
  }

}
