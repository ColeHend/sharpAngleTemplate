import { Component, OnInit } from "@angular/core";
import { Observable, share } from "rxjs";
import { AuthService } from "src/app/services/authorize.service";
import { DBService } from "src/app/services/database.service";
import { NavigationService } from "src/app/services/navigation.service";
import { ThemeService } from "src/app/services/theme.service";

@Component({
    selector: 'app-homeSecure',
    templateUrl: './secure.component.html',
    styleUrls: ['./secure.component.scss']
  })
  export class HomeSecureComponent  implements OnInit{
    constructor(private themeService: ThemeService, private authService: AuthService, private navService:NavigationService){}
    public primaryTheme?:Observable<string>;
    public accentTheme?:Observable<string>;
    public hoverTheme?:Observable<string>;
    public username = this.authService.getUsername();
    public isLoggedIn = this.authService.getLoggedInValue()

    ngOnInit(): void {
        // Get Themes
        this.primaryTheme = this.themeService.getPrimaryTheme();
        this.accentTheme = this.themeService.getAccentTheme();
        this.hoverTheme = this.themeService.getHoverTheme();
        this.navService.showHomeBar()
      }
  }