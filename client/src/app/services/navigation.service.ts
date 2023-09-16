import { Injectable } from '@angular/core';
import { NavbarService } from './navbar.service';
import { HomeComponent } from '../components/home/home.component';
import { EmptyComponent } from '../components/empty/empty.component';
import { ThemeService } from './theme.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({providedIn:'root'})
export class NavigationService {
    constructor(private navbarService: NavbarService, private themeService:ThemeService){}
    private themeBool = new BehaviorSubject<boolean>(false);
    public createMenu(){
        this.navbarService.setMenuItems(
            {
                name:'Homebar',
                callback:()=>{
                    this.showHomeBar();
                }, 
                tooltip:"Show Home Navbar"
            },
            {
                name:'Change Theme', 
                callback: ()=>{
                    if (!this.themeBool.value) {
                        this.themeService.changeTheme('lightTheme')
                        this.themeBool.next(true)
                    } else {
                        this.themeService.changeTheme('darkTheme')
                        this.themeBool.next(false)
                    }
                }
            }
        );
    }
    private hideAll(){
        this.navbarService.hideSecondRow();
        this.navbarService.hideTabs();
        this.navbarService.hideText();
    }
    public showHomeBar(){
        this.hideAll();
        this.navbarService.showSecondRow()
        // Text at start of Bar
        this.navbarService.showText();
        this.navbarService.setSecondText('Hello Second Bar')
        // Tabs after the Text
        // this.navbarService.showTabs()
        this.navbarService.setTabs({name:"Tab 1",component: HomeComponent}, {name:"Tab 2",component: EmptyComponent})
        // Icons on the right of the bar
        this.navbarService.setSecondIcons({iconName:"home",callback:()=>{},tooltip:'Home Screen'})
    }
}