import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, combineLatest } from "rxjs";
import { AuthService } from 'src/app/services/authorize.service';
import { ThemeService } from "src/app/services/theme.service";

type formValue = "username" | "password";
@Component({
    selector: 'app-registerBoxes',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
  export class RegisterComponent implements OnInit{
    constructor(private themeService: ThemeService,private authService:AuthService,private formBuilder:FormBuilder){}
    
    public primaryTheme = this.themeService.getPrimaryTheme();
    public hoverTheme = this.themeService.getHoverTheme();
    public accentTheme = this.themeService.getAccentTheme();

    public registerForm = this.formBuilder.group({
        username: ["",[
            Validators.minLength(3),
            Validators.required
        ]],
        password: ["",[
            Validators.minLength(8),
            Validators.required
        ]],
        passwordConfirm: ["",[
            Validators.minLength(8),
            Validators.required
        ]]
  }, this.passwordMatchValidator);
    
    public passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('passwordConfirm')?.value
           ? null : {'mismatch': true};
    }

    public usernameValue = this.authService.getUsername();
    public passValue = this.authService.getPassword();

    get loginOnRegister(){  return this.authService.getLoginOnRegister().value }
    set loginOnRegister(value:boolean){ this.authService.setLoginOnRegister(value) }

    get username(){ return this.registerForm.get("username") }
    get password(){ return this.registerForm.get("password") }
    
    public ngOnInit(): void {
    }
    
    public register(){
        let userna = this.usernameValue
        let pass = this.passValue
        if (userna && pass) {
            this.authService.register(userna,pass).subscribe({
              next:res=>{
                console.log("Registration Complete!");
                console.log(res);
              },
              complete:()=>{
                if (this.loginOnRegister == true) {
                  this.authService.login(userna, pass).subscribe((val)=>{
                    if (val) {
                        console.log("Successful Login!");
                        console.log(val);
                    }
                  }).unsubscribe()
                }
              }
            }).unsubscribe()
        }
    }

  }