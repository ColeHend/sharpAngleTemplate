import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthService } from "src/app/services/authorize.service";
import { DialogData } from "src/app/services/navigation.service";
import { ThemeService } from "src/app/services/theme.service";

@Component({
    selector: 'app-LoginModal',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginModal implements OnInit {
    constructor(public dialogRef: MatDialogRef<LoginModal>, @Inject(MAT_DIALOG_DATA) public data: DialogData, public authService: AuthService, public themeService: ThemeService) {}
    public usernameValid:BehaviorSubject<boolean> = new BehaviorSubject(false);
    public passwordValid:BehaviorSubject<boolean> = new BehaviorSubject(false);
    public primaryTheme:Observable<string> = new BehaviorSubject("");
    public hoverTheme:Observable<string> = new BehaviorSubject("");
    public usernameValue = this.authService.getUsername();
    public passValue = this.authService.getPassword();

    ngOnInit(): void { 
        this.usernameValid  = this.authService.getLoginStatus();
        this.passwordValid = this.authService.getRegisterStatus();
        this.primaryTheme = this.themeService.getPrimaryTheme();
        this.hoverTheme = this.themeService.getHoverTheme();
       
    }
    

    public closeModal(){
        this.dialogRef.close()
    }
  }