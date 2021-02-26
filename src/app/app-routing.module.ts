import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { MovieComponent } from './components/movie/movie.component';
import { TvSeriesComponent } from './components/tv-series/tv-series.component';
import { FashionComponent } from './components/fashion/fashion.component';
import { EndorsementComponent } from './components/endorsement/endorsement.component';
import { DailyLifeComponent } from './components/daily-life/daily-life.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PostComponent } from './components/post/post.component';
import { PostLikedComponent } from './components/post-liked/post-liked.component';

const routes: Routes = [
  { path: 'activity', component: ActivityComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'tv-series', component: TvSeriesComponent },
  { path: 'fashion', component: FashionComponent },
  { path: 'endorsement', component: EndorsementComponent },
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
