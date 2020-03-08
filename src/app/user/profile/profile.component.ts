import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


function passwordMatch(c: AbstractControl) {
  return c.value.password === c.value.rePassword ? null : { passwordMatch: true };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  registerForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  phoneRegex = /[0-9]+/g;

  constructor(fb: FormBuilder,
              private userService: UserService,
              private router: Router
  ) {
    this.registerForm = fb.group({
      username: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]+/g), Validators.maxLength(15)]],
      country: ['', [Validators.required]],
      passwords: fb.group({
        password: ['', [Validators.required, Validators.maxLength(40)]],
        rePassword: ['', [Validators.required]]
      }, { validators: [passwordMatch] })

    });
  }

  registerHandler(data: object) {
    this.userService.register(data);
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
