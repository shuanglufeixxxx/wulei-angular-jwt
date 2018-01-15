import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sign-in',
  providers: [ UserService ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  usernameGroup: FormGroup;

  passwordGroup: FormGroup;

  signInGroup: FormGroup;

  styleLeft: number = 0;

  backgroundCanvasAnimation: string;

  showableAnimation: string;

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

    this.signInGroup = this.formBuilder.group( {usernameGroup: this.usernameGroup, passwordGroup: this.passwordGroup} );

    this.backgroundCanvasAnimation = "appear";
    this.showableAnimation = "dropDown";
  }

  nextStep() {
    if(this.usernameGroup.valid) {
      this.styleLeft = -100;
    }
  }

  signIn() {
    if(this.signInGroup.valid) {
      let userInfo = this.deepCopyUserInfo();
      this.userService.signIn(userInfo.username, userInfo.password).subscribe(
        result => {
          if(result && result.length > 0) {
            this.router.navigate( [{ outlets: { action: null } }] );
          } else {
            this.signInGroup.reset();
            this.styleLeft = -200;
          }
        }
      );
    }
  }

  deepCopyUserInfo(): { username: string, password: string } {
    var user = {
      username: this.signInGroup.get('usernameGroup.usernameControl').value as string,
      password: this.signInGroup.get('passwordGroup.passwordControl').value as string
    }
    return user;
  }

  closeAnimation(): Observable<any> {
    this.backgroundCanvasAnimation = "disappear";
    this.showableAnimation = "fallDown";
    return Observable.of(null).delay(200);
  }

  close() {
    this.closeAnimation().subscribe( _ => {
      this.router.navigate( [{ outlets: { action: null } }] );
    })
  }

  navigateToSignUp() {
    this.closeAnimation().subscribe( _ => {
      this.router.navigate( [{ outlets: { action: 'sign-up' } }] );
    })
  }

  tryAgain() {
    this.styleLeft = 0;
  }
}
