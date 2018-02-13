import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './activity/activity.component';
import { MovieComponent } from './movie/movie.component';
import { TvSeriesComponent } from './tv-series/tv-series.component';
import { FashionComponent } from './fashion/fashion.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { DailyLifeComponent } from './daily-life/daily-life.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PostComponent } from './post/post.component';
import { PostLikedComponent } from './post-liked/post-liked.component';

const routes: Routes = [
  { path: 'activity', component: ActivityComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'tv-series', component: TvSeriesComponent },
  { path: 'fashion', component: FashionComponent },
  { path: 'advertisement', component: AdvertisementComponent },
  { path: 'daily-life', component: DailyLifeComponent },
  { path: '', redirectTo: 'activity', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, outlet: 'action'},
  { path: 'sign-up', component: SignUpComponent, outlet: 'action'},
  { path: 'p/:id', component: PostComponent },
  { path: 'my/post-liked', component: PostLikedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
