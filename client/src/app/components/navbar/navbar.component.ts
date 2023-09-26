import { AfterViewInit, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/authorize.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    constructor(private navService: NavigationService, private authService: AuthService){}
    public subs = new Subscription();
    
    public navCheck = (result:any)=>{
      console.log("navCheck Result: ", result);
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

    public ngOnDestroy(): void {
      this.subs.unsubscribe();
    }

    private async isLoggedInCheck() {
      let isLoggedIn = await this.authService.isLoggedIn();
      this.subs.add(isLoggedIn.subscribe(this.navCheck));
    }
}