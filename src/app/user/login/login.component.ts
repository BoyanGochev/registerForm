import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isWrong: boolean;


  constructor(
    private userService: UserService,
    private router: Router
  ) { }



  ngOnInit() { }

  loginHandler(data: any) {
    this.userService.login(data).subscribe(
      res => {
        this.userService.sethAuthInfo(res);
        this.router.navigate(['/home']);
      },
      err => {
        if (err.status === 401) {
          this.isWrong = true;
        }
      }
    );

  }

}
