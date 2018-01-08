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

  constructor(private _formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    @Inject('baseURL') private baseURL: string) { }

  ngOnInit() {
    this.usernameGroup = this._formBuilder.group({
      usernameControl: ['', [ Validators.minLength(2), Validators.maxLength(10) ]]
    });

    this.passwordGroup = this._formBuilder.group({
      passwordControl: ['', [ Validators.minLength(2), Validators.maxLength(10) ]]
    });

    this.passwordConfirmGroup = this._formBuilder.group({
      passwordConfirmControl: ['', Validators.required]
    });

    this.signUpGroup = this._formBuilder.group({
      usernameGroup: this.usernameGroup,
      passwordGroup: this.passwordGroup,
      passwordConfirmGroup: this.passwordConfirmGroup
    }, passwordMatchValidator);
    
    function passwordMatchValidator(g: FormGroup) {
      console.log("hello");
      return g.get('passwordGroup').get('passwordControl').value
        === g.get('passwordConfirmGroup').get('passwordConfirmControl').value
        ? null : {'match': false};
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
        signUp => {
          this.router.navigate( [{ outlets: { action: null } }] );
        },
        error => {
          this.styleLeft = 0;
          this.signUpGroup.reset();
        }
      );
    }
  }

  deepCopyUserInfo(): { username: string, password: string } {
    let value = this.signUpGroup.value;
    var user = {
      username: value.username as string,
      password: value.password as string
    }
    return user;
  }

  close() {
    this.router.navigate( [{ outlets: { action: null } }] );
  }
}
