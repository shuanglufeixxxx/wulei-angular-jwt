import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RestangularModule, Restangular } from 'ngx-restangular';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderMobileComponent } from './header-mobile/header-mobile.component';
import { MenubarMobileComponent } from './menubar-mobile/menubar-mobile.component';
import { FooterComponent } from './footer/footer.component';
import { ActivityComponent } from './activity/activity.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { MovieComponent } from './movie/movie.component';
import { DailyLifeComponent } from './daily-life/daily-life.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { SlideComponent } from './slide/slide.component';
import { PlaybillGalleryComponent } from './playbill-gallery/playbill-gallery.component';
import { restangularConfig } from './shared/restangularConfig';
import { baseURL } from './shared/baseURL';
import { AppRoutingModule } from './app-routing.module';
import { FooterMobileComponent } from './footer-mobile/footer-mobile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PostComponent } from './post/post.component';
import { SlideShowComponent } from './slide/slide-show/slide-show.component';
import { SlidePreviousDirective } from './slide/slide-previous.directive';
import { SlideNextDirective } from './slide/slide-next.directive';
import { FashionComponent } from './fashion/fashion.component';
import { ConcurrencyService } from './services/concurrency.service';
import { FeaturedPictureService } from './services/featured-picture.service';
import { FeaturedPostService } from './services/featured-post.service';
import { PostLikeService } from './services/post-like.service';
import { PictureService } from './services/picture.service';
import { PostService } from './services/post.service';
import { AccountService } from './services/account.service';
import { Account } from './shared/Account';
import { REST_FUL_RESPONSE, restangularFullResponseConfig } from './shared/restangularFullResponseConfig';
import { timeOutMilliseconds } from './shared/timeOutMilliseconds';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderMobileComponent,
    MenubarMobileComponent,
    FooterComponent,
    ActivityComponent,
    TvSeriesComponent,
    MovieComponent,
    DailyLifeComponent,
    AdvertisementComponent,
    PostPreviewComponent,
    SlideComponent,
    PlaybillGalleryComponent,
    FooterMobileComponent,
    SignInComponent,
    SignUpComponent,
    PostComponent,
    SlideShowComponent,
    SlidePreviousDirective,
    SlideNextDirective,
    FashionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RestangularModule.forRoot(restangularConfig),
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  entryComponents: [
  ],
  providers: [
    ConcurrencyService,
    FeaturedPictureService,
    FeaturedPostService,
    PostLikeService,
    PictureService,
    PostService,
    AccountService,
    { provide: 'baseURL', useValue: baseURL },
    { provide: 'timeOutMilliseconds', useValue: timeOutMilliseconds },
    { provide: REST_FUL_RESPONSE, useFactory: restangularFullResponseConfig, deps: [Restangular]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
