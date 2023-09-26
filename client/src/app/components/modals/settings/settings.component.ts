import { Component } from "@angular/core";
import { AuthService } from "src/app/services/authorize.service";
import { ThemeService } from "src/app/services/theme.service";


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
  })
  export class SettingsComponent {
    constructor(private themeService: ThemeService, private authService: AuthService){}
    public primaryTheme = this.themeService.getPrimaryTheme();
    public accentTheme = this.themeService.getAccentTheme();
    public hoverTheme = this.themeService.getHoverTheme();
    
  }