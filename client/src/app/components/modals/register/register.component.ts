import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "src/app/services/authorize.service";
import { DialogData } from "src/app/services/navigation.service";
import { ThemeService } from "src/app/services/theme.service";
import { LoginModal } from "../login/login.component";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";

@Component({
    selector: 'app-registerModal',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
  export class RegisterModal implements OnInit {
    constructor(public dialogRef: MatDialogRef<LoginModal>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public authService: AuthService, public themeService: ThemeService) {}
      
    public primaryTheme:Observable<string> =this.themeService.getPrimaryTheme();
      public hoverTheme:Observable<string> = this.themeService.getHoverTheme();
      public ngOnInit(): void {
        

      }

      
      
  }