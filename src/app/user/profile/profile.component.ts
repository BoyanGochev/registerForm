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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo: any;
  editForm: FormGroup;

  // tslint:disable-next-line: max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  phoneRegex = /[0-9]+/g;

  constructor(
    fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private userValidatorsService: UserValidatorsService
  ) {
    this.editForm = fb.group({
      username: ['', [Validators.required, Validators.maxLength(40)], this.validateUserNotTaken.bind(this)],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]+/g), Validators.maxLength(15)]],
      country: ['', [Validators.required]],
      passwords: fb.group({
        password: ['', [Validators.required, Validators.maxLength(40)]],
        rePassword: ['', [Validators.required]]
      }, { validators: [passwordMatch] })

    });
  }

  updateProfile(info) {
    this.editForm.patchValue({
      username: this.userInfo.username,
      email: this.userInfo.email,
      phone: this.userInfo.phone,
      country: this.userInfo.country,
    });
  }

  editHandler(data) {
    this.userService.editUserInfo(data).subscribe(
      res => {
        this.userService.sethAuthInfo(res);
        this.router.navigate(['']);
      }
    );
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      res => {
        this.userInfo = res;
        this.updateProfile(res);
      }
    );

  }

  validateUserNotTaken(c: AbstractControl) {
    return this.userValidatorsService.checkEditUser(c.value).pipe(
      map(res => {
        return res ? { userTaken: true } : null;
      })
    );
  }

}
