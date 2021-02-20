import { BrowserModule, Title } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { baseUrl } from './shared/baseUrl';
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
import { timeOutMilliseconds } from './shared/timeOutMilliseconds';
import { PostShowCanvasComponent } from './post-show-canvas/post-show-canvas.component';
import { ShowPlusGalleryComponent } from './show-plus-gallery/show-plus-gallery.component';
import { PostLikedComponent } from './post-liked/post-liked.component';
import { DimensionService } from './services/dimension.service';
import { imageURL } from './shared/imageURL';
import { CookieService } from 'ngx-cookie-service';
import { InjectorWrapper } from './shared/InjectorWrapper';
import { TokenInterceptor } from './services/token-interceptor';
import { JsonContentTypeInterceptor } from './services/json-content-type-interceptor';

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
    FashionComponent,
    PostShowCanvasComponent,
    ShowPlusGalleryComponent,
    PostLikedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
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
    DimensionService,
    Title,
    CookieService,
    { provide: 'baseUrl', useValue: baseUrl },
    { provide: 'imageURL', useValue: imageURL },
    { provide: 'timeOutMilliseconds', useValue: timeOutMilliseconds },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JsonContentTypeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    InjectorWrapper.injector = injector;
  }
}
