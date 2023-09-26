import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from 'src/app/services/authorize.service';
import { ThemeService } from "src/app/services/theme.service";

@Component({
    selector: 'app-loginBoxes',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnDestroy {
      public subs = new Subscription();
      constructor(private themeService: ThemeService,private authService:AuthService,private formBuilder:FormBuilder){}
      public ngOnDestroy(): void {
            this.subs.unsubscribe()
        }
      
      public primaryTheme = this.themeService.getPrimaryTheme();
      public hoverTheme = this.themeService.getHoverTheme();
      public accentTheme = this.themeService.getAccentTheme();
      
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
            this.subs.add(this.authService.login(userna,pass).subscribe({
                next: (value)=>{
                    this.authService.alertLog.next(`Login: ${value}`);
                    this.loginForm.reset();
                
                },
                error: (err)=>{
                    console.error(err)
                }
            }));
        }
    }
  }
  