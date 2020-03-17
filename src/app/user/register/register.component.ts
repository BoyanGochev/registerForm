import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UserValidatorsService } from '../user-validators.service';
import { map } from 'rxjs/operators';

function passwordMatch(c: AbstractControl) {
  return c.value.password === c.value.rePassword ? null : { passwordMatch: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  phoneRegex = /[0-9]+/g;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private userValidatorsService: UserValidatorsService

  ) {
    this.registerForm = fb.group({
      username: ['', [Validators.required, Validators.maxLength(40)], this.validateUserNotTaken.bind(this)],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)], this.validateEmailNotTaken.bind(this)],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]+/g), Validators.maxLength(15)]],
      country: ['', [Validators.required]],
      passwords: fb.group({
        password: ['', [Validators.required, Validators.maxLength(40)]],
        rePassword: ['', [Validators.required]]
      }, { validators: [passwordMatch] })

    });
  }

  registerHandler(data: object) {
    this.userService.register(data).subscribe(
      res => {
        this.userService.sethAuthInfo(res);
        this.router.navigate(['/']);
      }
    );
  }

  validateEmailNotTaken(c: AbstractControl) {
    return this.userValidatorsService.checkEmail(c.value).pipe(
      map(res => {
        return res ? { emailTaken: true } : null;
      })
    );
  }

  validateUserNotTaken(c: AbstractControl) {
    return this.userValidatorsService.checkUser(c.value).pipe(
      map(res => {
        return res ? { userTaken: true } : null;
      })
    );
  }

  ngOnInit() { }

}
