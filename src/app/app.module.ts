import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderMobileComponent } from './components/header-mobile/header-mobile.component';
import { MenubarMobileComponent } from './components/menubar-mobile/menubar-mobile.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActivityComponent } from './components/activity/activity.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { MovieComponent } from './components/movie/movie.component';
import { DailyLifeComponent } from './components/daily-life/daily-life.component';
import { EndorsementComponent } from './components/endorsement/endorsement.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { SlideComponent } from './components/slide/slide.component';
import { PlaybillGalleryComponent } from './components/playbill-gallery/playbill-gallery.component';
import { baseUrl } from './configs/baseUrl';
import { AppRoutingModule } from './app-routing.module';
import { FooterMobileComponent } from './components/footer-mobile/footer-mobile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PostComponent } from './components/post/post.component';
import { SlideShowComponent } from './components/slide/slide-show/slide-show.component';
import { SlidePreviousDirective } from './components/slide/slide-previous.directive';
import { SlideNextDirective } from './components/slide/slide-next.directive';
import { FashionComponent } from './components/fashion/fashion.component';
import { ConcurrencyService } from './services/concurrency.service';
import { FeaturedPictureService } from './services/featured-picture.service';
import { FeaturedPostService } from './services/featured-post.service';
import { PostLikeService } from './services/post-like.service';
import { PictureService } from './services/picture.service';
import { PostService } from './services/post.service';
import { AccountService } from './services/account.service';
import { timeOutMilliseconds } from './configs/timeOutMilliseconds';
import { PostShowCanvasComponent } from './components/post-show-canvas/post-show-canvas.component';
import { ShowPlusGalleryComponent } from './components/show-plus-gallery/show-plus-gallery.component';
import { PostLikedComponent } from './components/post-liked/post-liked.component';
import { DimensionService } from './services/dimension.service';
import { imageUrl } from './configs/imageUrl';
import { CookieService } from 'ngx-cookie-service';
import { UrlInterceptor } from './interceptors/url-Interceptor';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { JsonContentTypeInterceptor } from './interceptors/json-content-type-interceptor';
import { JsKeyParseInterceptor } from './interceptors/js-key-parse-interceptor';

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
    EndorsementComponent,
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
    { provide: 'imageUrl', useValue: imageUrl },
    { provide: 'timeOutMilliseconds', useValue: timeOutMilliseconds },
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JsonContentTypeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JsKeyParseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
