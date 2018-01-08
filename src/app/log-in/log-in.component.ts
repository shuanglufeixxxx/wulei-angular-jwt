import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-log-in',
  providers: [ UserService ],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  usernameGroup: FormGroup;

  passwordGroup: FormGroup;

  logInGroup: FormGroup;

  styleLeft: number = 0;

  constructor(private userService: UserService,
    private _formBuilder: FormBuilder,
    private router: Router,
    @Inject('baseURL') private baseURL: string) { }

  ngOnInit() {
    this.usernameGroup = this._formBuilder.group({
      usernameControl: ['', [ Validators.minLength(2), Validators.maxLength(10) ]]
    });

    this.passwordGroup = this._formBuilder.group({
      passwordControl: ['', [ Validators.minLength(2), Validators.maxLength(10) ]]
    });

    this.logInGroup = this._formBuilder.group(
      {usernameGroup: this.usernameGroup, passwordGroup: this.passwordGroup});
    
    console.log(this.usernameGroup);
  }

  nextStep() {
    if(this.usernameGroup.valid) {
      this.styleLeft = -100;
    }
  }

  logIn() {
    if(this.logInGroup.valid) {
      let userInfo = this.deepCopyUserInfo();
      this.userService.logIn(userInfo.username, userInfo.password).subscribe(
        logIn => {
          this.router.navigate( [{ outlets: { action: null } }] );
        },
        error => {
          this.styleLeft = 0;
          this.logInGroup.reset();
        }
      );
    }
  }

  deepCopyUserInfo(): { username: string, password: string } {
    let value = this.logInGroup.value;
    var user = {
      username: value.username as string,
      password: value.password as string
    }
    return user;
  }

  close() {
    this.router.navigate( [{ outlets: { action: null } }] );
  }

  navigateToSignUp() {
    this.router.navigate( [{ outlets: { action: 'sign-up' } }] );
  }
}
