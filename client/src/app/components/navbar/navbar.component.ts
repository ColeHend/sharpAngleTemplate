import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/authorize.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    constructor(private navService: NavigationService, private authService: AuthService){}
    public navCheck = (result:any)=>{
      if (result) {
        this.navService.setLoggedInMenu();
      } else {
        this.navService.setLoggedOutMenu();
      }
    }

    public async ngOnInit() {
      await this.isLoggedInCheck()
      this.authService.getLoggedInValue().subscribe(this.navCheck)
    }

    private async isLoggedInCheck() {
      let isLoggedIn = await this.authService.isLoggedIn();
      
      isLoggedIn.subscribe(this.navCheck);
    }
}