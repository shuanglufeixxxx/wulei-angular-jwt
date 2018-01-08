import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from '../activity/activity.component';
import { MovieComponent } from '../movie/movie.component';
import { TvSeriesComponent } from '../tv-series/tv-series.component';
import { FasionShowComponent } from '../fasion-show/fasion-show.component';
import { AdvertisementComponent } from '../advertisement/advertisement.component';
import { DailyLifeComponent } from '../daily-life/daily-life.component';
import { LogInComponent } from '../log-in/log-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

const routes: Routes = [
  { path: 'activity', component: ActivityComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'tv-series', component: TvSeriesComponent },
  { path: 'fasion-show', component: FasionShowComponent },
  { path: 'advertisement', component: AdvertisementComponent },
  { path: 'daily-life', component: DailyLifeComponent },
  { path: '', redirectTo: 'activity', pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent, outlet: 'action'},
  { path: 'sign-up', component: SignUpComponent, outlet: 'action'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
