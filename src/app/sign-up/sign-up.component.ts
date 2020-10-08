import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs/Observable';
import { Picture } from '../shared/picture';
import { FeaturedPictureService } from '../services/featured-picture.service';
import { Account } from '../shared/account';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  featuredPicture: String;

  usernameGroup: FormGroup;

  passwordGroup: FormGroup;

  passwordConfirmGroup: FormGroup;

  signUpGroup: FormGroup;

  styleLeft: number = 0;

  backgroundCanvasAnimation: string;

  showableAnimation: string;

  usernamePlaceholder = "Type a name";
  passwordPlaceholder = "Enter password";
  passwordConfirmPlaceholder = "Enter your password again";

  signUpFailedMessage: string = "Sign up failed.";

  constructor(private formBuilder: FormBuilder,
    private featuredPictureService: FeaturedPictureService,
    private accountService: AccountService,
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

    this.backgroundCanvasAnimation = "appear";
    this.showableAnimation = "dropDown";

    this.featuredPictureService.getList("sign-up").subscribe(pictures => {
      this.featuredPicture = pictures[0].id;
    });
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
      let signUpInfo = this.deepCopySignUpInfo();
      this.accountService
        .signUp(signUpInfo.username, signUpInfo.password)
        .subscribe( ()=> {
          this.afterSignedUpSuccess();
        },
        error => {
          this.afterSignedUpFailed(error.message);
        });
    }
    else if (this.signUpGroup.hasError('notmatch')) {
      this.passwordConfirmGroup.reset();
      this.passwordConfirmPlaceholder = "Password not match. Enter your password again";
    }
  }

  deepCopySignUpInfo(): any {
    var signUpInfo = {};
    Object.assign( signUpInfo, {username: this.signUpGroup.get('usernameGroup.usernameControl').value as string} );
    Object.assign( signUpInfo, {password: this.signUpGroup.get('passwordGroup.passwordControl').value as string} );
    return signUpInfo;
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

  afterSignedUpFailed(message?: string) {
    this.signUpFailedMessage = message;
    this.signUpGroup.reset();
    this.styleLeft = -200;
  }

  afterSignedUpSuccess() {
    this.router.navigate( [{ outlets: { action: null } }] );
  }

  tryAgain() {
    this.styleLeft = 0;
  }
}
