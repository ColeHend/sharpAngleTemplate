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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DBService } from './services/database.service';
import { LoginComponent } from './components/loginBoxes/login.component';
import { TokenInterceptor } from './tools/token.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModal } from './components/modals/login/login.component';
import { RegisterModal } from './components/modals/register/register.component';
import { HomeSecureComponent } from './components/home/secure/secure.component';
import { HomeJsonComponent } from './components/home/json/json.component';
import { SettingsComponent } from './components/modals/settings/settings.component';
import { AdminSettingsComponent } from './components/modals/settings/admin/admin.component';
import { GuestSettingsComponent } from './components/modals/settings/guest/guest.component';
import { UserSettingsComponent } from './components/modals/settings/user/user.component';
import { SeaTrackerComponent } from './components/seaTracker/seaTracker.component';
import { SeaTrackBoard } from './components/seaTracker/board/board.component';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MatNavComponent,
    BodyBaseComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LoginModal,
    RegisterModal,
    HomeSecureComponent,
    HomeJsonComponent,
    SettingsComponent,
    AdminSettingsComponent,
    GuestSettingsComponent,
    UserSettingsComponent,
    SeaTrackerComponent,
    SeaTrackBoard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  providers: [NavbarService, NavigationService,ThemeService,DBService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
