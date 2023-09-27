import { Component } from "@angular/core";
import { AuthLevels, AuthService } from "src/app/services/authorize.service";
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
    public guestAuth = this.authService.getIsGuest();
    public userAuth = this.authService.getIsUser();
    public adminAuth = this.authService.getIsAdmin();

    public checkAuth(type:AuthLevels){
      return ()=>{
        if (type == "Guest") {
          this.authService.getIsGuest();
        } else if (type === "User") {
          this.authService.getIsUser();
        } else if (type === "Admin") {
          this.authService.getIsAdmin();
        }
      }
    }

    
  }