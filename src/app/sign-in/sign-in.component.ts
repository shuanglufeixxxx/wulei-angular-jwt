import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs/Observable';
import { Picture } from '../shared/picture';
import { FeaturedPictureService } from '../services/featured-picture.service';
import { Account } from '../shared/account';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  featuredPicture: String;

  usernameGroup: FormGroup;

  passwordGroup: FormGroup;

  signInGroup: FormGroup;

  styleLeft: number = 0;

  backgroundCanvasAnimation: string;

  showableAnimation: string;

  signInFailedMessage: string = "Sign in failed.";

  constructor(private accountService: AccountService,
    private featuredPictureService: FeaturedPictureService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject('imageURL') private imageURL: string
  ) {}

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
    
    this.featuredPictureService.getList("sign-in").subscribe(pictures => {
      this.featuredPicture = pictures[0].id;
    });
  }

  toEnterPasswordStep() {
    if(this.usernameGroup.valid) {
      this.styleLeft = -100;
    }
  }

  signIn() {
    if(this.signInGroup.valid) {
      let signInInfo = this.deepCopySignInInfo();
      this.accountService
        .signIn(signInInfo.username, signInInfo.password)
        .subscribe( ()=> {
          this.afterSignedInSuccess();
        },
        error => {
          this.afterSignedInFailed(error.message);
        });
    }
  }

  deepCopySignInInfo(): any {
    var signInInfo = {};
    Object.assign( signInInfo, {username: this.signInGroup.get('usernameGroup.usernameControl').value as string} );
    Object.assign( signInInfo, {password: this.signInGroup.get('passwordGroup.passwordControl').value as string} );
    return signInInfo;
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

  afterSignedInFailed(message?: string) {
    this.signInFailedMessage = message;
    this.signInGroup.reset();
    this.styleLeft = -200;
  }

  afterSignedInSuccess() {
    this.router.navigate( [{ outlets: { action: null } }] );
  }

  tryAgain() {
    this.styleLeft = 0;
  }
}
