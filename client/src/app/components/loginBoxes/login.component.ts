import { Component } from "@angular/core";
import { AuthService } from 'src/app/services/authorize.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-loginBoxes',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent {
    public usernameL:string = "";
    public passwordL:string = "";

    public usernameR:string = "";
    public passwordR:string = "";

    constructor(private authService:AuthService, private http:HttpService){}
  }