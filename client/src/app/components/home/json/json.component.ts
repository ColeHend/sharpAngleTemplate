import { Component, OnInit } from "@angular/core";
import { Observable, share } from "rxjs";
import { Collection } from "src/app/models/collections.model";
import { AuthService } from "src/app/services/authorize.service";
import { DBService } from "src/app/services/database.service";
import { NavigationService } from "src/app/services/navigation.service";
import { ThemeService } from "src/app/services/theme.service";

@Component({
    selector: 'app-homeJson',
    templateUrl: './json.component.html',
    styleUrls: ['./json.component.scss']
  })
  export class HomeJsonComponent  implements OnInit{
    constructor(private themeService: ThemeService, private dbService:DBService, private navService:NavigationService){}
    public primaryTheme?:Observable<string>;
    public accentTheme?:Observable<string>;
    public hoverTheme?:Observable<string>;
    public testCollect?:Observable<Collection>;
    ngOnInit(): void {
        // Get Themes
        this.primaryTheme = this.themeService.getPrimaryTheme();
        this.accentTheme = this.themeService.getAccentTheme();
        this.hoverTheme = this.themeService.getHoverTheme();
        // Get info from collections of data
        this.testCollect = this.dbService.getCollection("test").pipe(share());
        this.navService.showHomeBar();
      }
  }