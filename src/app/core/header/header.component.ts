import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {

        this.isLoggedIn = sessionStorage.getItem('authtoken') !== null;
      }
    });
  }

  ngOnInit() {

  }

  logoutHandler() {
    this.userService.logout();
  }

}
