import { Component } from "@angular/core";
import { AuthService } from 'src/app/services/authorize.service';

@Component({
    selector: 'app-loginBoxes',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent {
      constructor(private authService:AuthService){}
      
      public username:string = "";
      public password:string = "";
  }