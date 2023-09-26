import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolIcon } from '../models/tool-icon.model';
import { MenuItem } from '../models/menu-item.model';
import { Tab } from '../models/tab.model';

@Injectable({providedIn: 'root'})
export class NavbarService {
    private SiteName = new BehaviorSubject("Sea Tracker")
    private MenuItems = new BehaviorSubject<MenuItem[]>([])
    private SecondRowIcons = new BehaviorSubject<ToolIcon[]>([])
    private SecondLineText = new BehaviorSubject<string>('Second Line')
    private hiddenText = new BehaviorSubject<boolean>(true);
    private displaySecondRow = new BehaviorSubject<boolean>(false)

    // Name
    getName(){
        return this.SiteName
    }
    setName(name:string){
        this.SiteName.next(name)
    }
    //Menu Items
    getMenuItems(){
        return this.MenuItems
    }
    setMenuItems(icon:MenuItem, ...rest:MenuItem[]){
        this.MenuItems.next([icon, ...rest])
    }
    // Second Row stuff
    //icons
    getSecondIcons(){
        return this.SecondRowIcons
    }
    setSecondIcons(icon:ToolIcon, ...rest:ToolIcon[]){
        this.SecondRowIcons.next([icon, ...rest])
    }
    //text
    shouldHideText(){
        return this.hiddenText
    }
    showText(){
        this.hiddenText.next(true)
    }
    hideText(){
        this.hiddenText.next(false)
    }
    getSecondText(){
        return this.SecondLineText
    }
    setSecondText(name:string){
        this.SecondLineText.next(name)
    }
    //show/hide
    shouldShowSecondRow(){
        return this.displaySecondRow
    }
    showSecondRow(){
        this.displaySecondRow.next(true) 
    }
    hideSecondRow(){
        this.displaySecondRow.next(false) 
    }
    //Tabs
    private secondTabs = new BehaviorSubject<Tab[]>([]);
    private tabIndex = new BehaviorSubject<number>(0);
    private showTabsBool = new BehaviorSubject<boolean>(false);
    getTabIndex(){
        return this.tabIndex
    }
    setTabIndex(index:number){
        this.tabIndex.next(index)
    }
    getTabs(): BehaviorSubject<Tab[]>{
        return this.secondTabs
    }
    setTabs(tabs:Tab, ...rest:Tab[]){
        this.secondTabs.next([tabs, ...rest])
    }
    getShowTabStatus(){
        return this.showTabsBool
    }
    showTabs(){
        this.showTabsBool.next(true)
    }
    hideTabs(){
        this.showTabsBool.next(false)
    }
}
