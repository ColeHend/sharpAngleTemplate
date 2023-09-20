import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/authorize.service';

@Component({
    selector: 'app-loginBoxes',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent {
      constructor(private authService:AuthService,private formBuilder:FormBuilder){}
      
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
            this.authService.login(userna,pass).subscribe((value)=>{
                this.loginForm.reset();
                console.log("Login Response: ",value);
            })
        }
    }
  }