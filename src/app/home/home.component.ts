import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;

  constructor() {
  }

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem('authtoken') !== null;
    this.username = sessionStorage.getItem('name');
  }

 }
