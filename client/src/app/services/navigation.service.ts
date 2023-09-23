import { Component, Inject, Injectable } from '@angular/core';
import { NavbarService } from './navbar.service';
import { HomeComponent } from '../components/home/home.component';
import { EmptyComponent } from '../tools/components/empty/empty.component';
import { ThemeService } from './theme.service';
import { BehaviorSubject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { LoginModal } from '../components/modals/login/login.component';
import { RegisterModal } from '../components/modals/register/register.component';
import { AuthService } from './authorize.service';

@Injectable({providedIn:'root'})
export class NavigationService {
    constructor(private navbarService: NavbarService, private themeService:ThemeService,public dialog: MatDialog, private authService:AuthService){}
    private themeBool = new BehaviorSubject<boolean>(false);
    private RegisterMenuObject = {
        name:"Register",
        callback: ()=>{
            this.showModal(RegisterModal, {
                height: "430px",
                width: "398px",
                panelClass: "RegisterModal"
            }).afterClosed().subscribe((value)=>{
            })
        }
    };
    private LoginMenuObject = {
        name:"Login",
        callback: ()=>{
            this.showModal(LoginModal, {
                height: "430px",
                width: "398px",
                panelClass: "LoginModal"
            }).afterClosed().subscribe((value)=>{
                
            })
        }
    }
    public setLoggedInMenu(){
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
            },
            {
                name:"Logout",
                callback: ()=>{
                    this.authService.logout();
                }
            }
        );
    }
    public setLoggedOutMenu(){
        this.navbarService.setMenuItems(
            this.LoginMenuObject, this.RegisterMenuObject,
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
    public showModal(component:ComponentType<any>, config:MatDialogConfig){ //@Inject(MAT_DIALOG_DATA) public data: DialogData
        const theDialog = this.dialog.open(component, config)
        return theDialog;
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
        this.navbarService.showTabs()
        this.navbarService.setTabs({name:"Tab 1",component: EmptyComponent}, {name:"Tab 2",component: EmptyComponent})
        // Icons on the right of the bar
        this.navbarService.setSecondIcons({iconName:"home",callback:()=>{},tooltip:'Home Screen'})
    }
}
export interface DialogData {

}