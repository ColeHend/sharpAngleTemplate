import { Component, OnInit } from "@angular/core";
import { combineLatest } from "rxjs"
import { FormControl } from "@angular/forms";
import { AuthService } from "../../../../services/authorize.service";
import { ThemeService, themes } from "../../../../services/theme.service";

@Component({
    selector: 'app-guestSettings',
    templateUrl: './guest.component.html',
    styleUrls: ['./guest.component.scss']
  })
  export class GuestSettingsComponent implements OnInit{
    constructor(private themeService: ThemeService, private authService: AuthService){}
    public accentTheme = this.themeService.getAccentTheme();
    public ngOnInit(): void {
      this.themeControl.valueChanges.subscribe((value)=>{
        this.themeService.changeTheme(value ?? this.themeService.getTheme());
      })
    }

    public getDisplayName(name:string) {
      return name.split(/(?=[A-Z])/).map(value => value.charAt(0).toUpperCase() + value.slice(1)).join(' ');
    }
    
    public allThemes = this.themeService.allThemes.slice();
    public themeControl = new FormControl(this.themeService.getTheme());
    
  }