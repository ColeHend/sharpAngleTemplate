import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/authorize.service';
import { ThemeService } from "src/app/services/theme.service";

@Component({
    selector: 'app-loginBoxes',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent {
      constructor(private themeService: ThemeService,private authService:AuthService,private formBuilder:FormBuilder){}
      public hoverTheme = this.themeService.getHoverTheme();
      
      public loginForm = this.formBuilder.group({
        username: ["",[
            Validators.minLength(3),
            Validators.required
        ]],
        password: ["",[
            Validators.minLength(8),
            Validators.required
        ]]
    });

    public usernameIn = ()=>this.authService.setUsername(this.username?.value ?? "");
    public passwordIn = ()=>this.authService.setPassword(this.password?.value ?? "");

    public isValidUpdate(){
        let usernameValid = !this.loginForm.get("username")?.errors && !this.loginForm.get("username")?.pristine
        let passswordValid = !this.loginForm.get("passsword")?.errors && !this.loginForm.get("passsword")?.pristine
        this.authService.switchLoginStatus(usernameValid);
    }
    get username(){
        return this.loginForm.get("username")
    }
    get password(){
        return this.loginForm.get("password")
    }

    public login(){
        let userna = this.username?.value
        let pass = this.password?.value
        if (userna && pass) {
            this.authService.login(userna,pass).subscribe({
                next: (value)=>{
                    this.loginForm.reset();

                },
                error: (err)=>{
                    console.error(err)
                }
            });
        }
    }
  }
  