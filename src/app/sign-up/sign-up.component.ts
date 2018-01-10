import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  providers: [ UserService ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  usernameGroup: FormGroup;

  passwordGroup: FormGroup;

  passwordConfirmGroup: FormGroup;

  signUpGroup: FormGroup;

  styleLeft: number = 0;

  usernamePlaceholder = "Type a name";
  passwordPlaceholder = "Enter password";
  passwordConfirmPlaceholder = "Enter your password again";

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    @Inject('baseURL') private baseURL: string) { }

  ngOnInit() {
    this.usernameGroup = this.formBuilder.group({
      usernameControl: ['', [ Validators.minLength(2), Validators.maxLength(10) ]]
    });

    this.passwordGroup = this.formBuilder.group({
      passwordControl: ['', [ Validators.minLength(2), Validators.maxLength(10) ]]
    });

    this.passwordConfirmGroup = this.formBuilder.group({
      passwordConfirmControl: ['', Validators.required]
    });

    this.signUpGroup = this.formBuilder.group({
      usernameGroup: this.usernameGroup,
      passwordGroup: this.passwordGroup,
      passwordConfirmGroup: this.passwordConfirmGroup
    }, {validator: passwordMatchValidator});
    
    function passwordMatchValidator(g: FormGroup) {
      return g.get('passwordGroup.passwordControl').value
        === g.get('passwordConfirmGroup.passwordConfirmControl').value
        ? null : {'notmatch': true};
    }
  }

  nextStep(from: string) {
    switch(from) {
      case 'username':
      if(this.usernameGroup.valid) {
        this.styleLeft = -100;
      }
      break;
      case 'password':
      if(this.passwordGroup.valid) {
        this.styleLeft = -200;
      }
      break;
    }
  }

  signUp() {
    if(this.signUpGroup.valid) {
      let userInfo = this.deepCopyUserInfo();
      this.userService.signUp(userInfo.username, userInfo.password).subscribe(
        result => {
          if(result) {
            this.router.navigate( [{ outlets: { action: null } }] );
          } else {
            this.signUpGroup.reset();
            this.styleLeft = -300;
          }
        }
      );
    } else if (this.signUpGroup.hasError('notmatch')) {
      this.passwordConfirmGroup.reset();
      this.passwordConfirmPlaceholder = "Password not match. Enter your password again";
    }
  }

  deepCopyUserInfo(): { username: string, password: string } {
    let value = this.signUpGroup.value;
    var user = {
      username: this.signUpGroup.get('usernameGroup.usernameControl').value as string,
      password: this.signUpGroup.get('passwordGroup.passwordControl').value as string
    }
    return user;
  }

  close() {
    this.router.navigate( [{ outlets: { action: null } }] );
  }

  tryAgain() {
    this.styleLeft = 0;
  }
}
