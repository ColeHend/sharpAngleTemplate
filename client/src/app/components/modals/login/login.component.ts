import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
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
    public primaryTheme:BehaviorSubject<string> = new BehaviorSubject("");
    public hoverTheme:BehaviorSubject<string> = new BehaviorSubject("");
    public usernameValue = "";
    public passValue = "";

    ngOnInit(): void { 
        this.usernameValid  = this.authService.getLoginStatus();
        this.passwordValid = this.authService.getRegisterStatus();
        this.primaryTheme = this.themeService.getPrimaryTheme();
        this.hoverTheme = this.themeService.getHoverTheme();
        this.authService.getUsername().subscribe((username)=>{
            this.usernameValue = username;
        })
        this.authService.getPassword().subscribe(pass=>{
            this.passValue = pass;
        })
    }
    

    public closeModal(){
        this.dialogRef.close()
    }
    public login(){
        let userna = this.usernameValue;
        let pass = this.passValue;
        if (userna && pass) {
            this.authService.login(userna,pass).subscribe({
                next: (value)=>{
                    // this.loginForm.reset();
                    this.authService.getLoginStatus().next(true);
                    this.closeModal();
                },
                error: (err)=>{
                    console.error(err)
                }
            });
        }
    }
  }