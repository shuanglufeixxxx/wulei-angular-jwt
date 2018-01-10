import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
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
import { FasionShowComponent } from './fasion-show/fasion-show.component';
import { DailyLifeComponent } from './daily-life/daily-life.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { SlideComponent } from './slide/slide.component';
import { PlaybillGalleryComponent } from './playbill-gallery/playbill-gallery.component';
import { MenubarItemDirective } from './header/menubar-item.directive';
import { restangularConfigFactory } from './shared/restangularConfigFactory';
import { baseURL } from './shared/baseURL';
import { AppRoutingModule } from './app-routing.module';
import { FooterMobileComponent } from './footer-mobile/footer-mobile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


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
    FasionShowComponent,
    DailyLifeComponent,
    AdvertisementComponent,
    PostPreviewComponent,
    SlideComponent,
    PlaybillGalleryComponent,
    MenubarItemDirective,
    FooterMobileComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RestangularModule.forRoot(restangularConfigFactory),
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
  ],
  providers: [
    { provide: 'baseURL', useValue: baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
