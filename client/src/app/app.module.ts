import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavbarService } from './services/navbar.service';
import { NavigationService } from './services/navigation.service';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BodyBaseComponent } from './tools/components/body-base/body-base.component';
import { MatNavComponent } from './tools/components/matnav/matnav.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DBService } from './services/database.service';
import { HttpService } from './services/http.service';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  } 
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MatNavComponent,
    HomeComponent,
    BodyBaseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RouterModule.forRoot(routes),
    NoopAnimationsModule,
    MaterialModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [NavbarService, NavigationService,ThemeService,DBService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
