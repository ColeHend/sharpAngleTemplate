import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomeJsonComponent } from './components/home/json/json.component';
import { HomeSecureComponent } from './components/home/secure/secure.component';
import { SeaTrackerComponent } from './components/seaTracker/seaTracker.component';
import { SeaTrackBoard } from './components/seaTracker/board/board.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
  },
  {
    path:'json',
    component: HomeJsonComponent,
  },
  {
    path: 'secure',
    component: HomeSecureComponent
  },
  {
    path: 'seaTrack',
    component: SeaTrackerComponent
  },
  {
    path: 'seaTrack/board',
    component: SeaTrackBoard
  },
  {
    path: '**',
    component: HomeComponent
  } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
