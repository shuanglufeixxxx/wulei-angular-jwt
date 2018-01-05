import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityComponent } from '../activity/activity.component';
import { MovieComponent } from '../movie/movie.component';
import { TvSeriesComponent } from '../tv-series/tv-series.component';
import { FasionShowComponent } from '../fasion-show/fasion-show.component';
import { AdvertisementComponent } from '../advertisement/advertisement.component';
import { DailyLifeComponent } from '../daily-life/daily-life.component';

const routes: Routes = [
  { path: 'activity', component: ActivityComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'tv-series', component: TvSeriesComponent },
  { path: 'fasion-show', component: FasionShowComponent },
  { path: 'advertisement', component: AdvertisementComponent },
  { path: 'daily-life', component: DailyLifeComponent },
  { path: '', redirectTo: 'activity', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule { }
