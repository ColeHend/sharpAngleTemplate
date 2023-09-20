import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, combineLatest } from "rxjs";
import { AuthService } from 'src/app/services/authorize.service';

type formValue = "username" | "password";
@Component({
    selector: 'app-registerBoxes',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
  export class RegisterComponent implements OnInit{
    constructor(private authService:AuthService,private formBuilder:FormBuilder){}

    public registerForm = this.formBuilder.group({
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
        return this.registerForm.get("username")
    }
    get password(){
        return this.registerForm.get("password")
    }

    public ngOnInit(): void {
        
    }
    
    public register(){
        let userna = this.username?.value
        let pass = this.password?.value
        if (userna && pass) {
            this.authService.register(userna,pass).subscribe(res=>{
                this.registerForm.reset();
                console.log("Register Response: ",res);
            })
        }
    }

  }