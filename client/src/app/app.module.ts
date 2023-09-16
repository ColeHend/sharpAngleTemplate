import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material.module';
import { MatNavComponent } from './components/navbar/matnav/matnav.component';
import { NavbarService } from './services/navbar.service';
import { NavigationService } from './services/navigation.service';
import { ThemeService } from './services/theme.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MatNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule
  ],
  providers: [NavbarService, NavigationService,ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
