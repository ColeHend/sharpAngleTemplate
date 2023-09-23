import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, share } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { DBService } from 'src/app/services/database.service';
import { Collection } from 'src/app/models/collections.model';
import { AuthService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private themeService: ThemeService, private dbService:DBService, private authService: AuthService){}
  public primaryTheme?:BehaviorSubject<string>;
  public accentTheme?:BehaviorSubject<string>;
  public hoverTheme?:BehaviorSubject<string>;
  public testCollect?:Observable<Collection>;
  public username = this.authService.getUsername();
  public isLoggedIn = this.authService.getLoggedInValue()
  ngOnInit(): void {
    // Get Themes
    this.primaryTheme = this.themeService.getPrimaryTheme();
    this.accentTheme = this.themeService.getAccentTheme();
    this.hoverTheme = this.themeService.getHoverTheme();
    // Get info from collections of data
    this.testCollect = this.dbService.getCollection("test").pipe(share());
  }
}