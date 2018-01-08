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
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject('baseURL') private baseURL: string) { }

  ngOnInit() {
    this.usernameGroup = this.formBuilder.group({
      usernameControl: ['', [ Validators.minLength(2), Validators.maxLength(10) ]]
    });

    this.passwordGroup = this.formBuilder.group({
      passwordControl: ['', [ Validators.minLength(2), Validators.maxLength(10) ]]
    });

    this.logInGroup = this.formBuilder.group(
      {usernameGroup: this.usernameGroup, passwordGroup: this.passwordGroup});
  }

  nextStep() {
    if(this.usernameGroup.valid) {
      console.log(this.logInGroup);
      this.styleLeft = -100;
    }
  }

  logIn() {
    console.log(this.logInGroup);
    if(this.logInGroup.valid) {
      let userInfo = this.deepCopyUserInfo();
      this.userService.logIn(userInfo.username, userInfo.password).subscribe(
        result => {
          if(result && result.length > 0) {
            this.router.navigate( [{ outlets: { action: null } }] );
          } else {
            this.logInGroup.reset();
            this.styleLeft = -200;
          }
        }
      );
    }
  }

  deepCopyUserInfo(): { username: string, password: string } {
    var user = {
      username: this.logInGroup.get('usernameGroup.usernameControl').value as string,
      password: this.logInGroup.get('passwordGroup.passwordControl').value as string
    }
    return user;
  }

  close() {
    this.router.navigate( [{ outlets: { action: null } }] );
  }

  navigateToSignUp() {
    this.router.navigate( [{ outlets: { action: 'sign-up' } }] );
  }

  tryAgain() {
    this.styleLeft = 0;
  }
}
