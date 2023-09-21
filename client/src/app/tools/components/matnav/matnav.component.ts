import { Component, OnInit } from '@angular/core';
import { BehaviorSubject , combineLatest} from 'rxjs';
import { ToolIcon } from 'src/app/models/tool-icon.model';
import { NavbarService } from 'src/app/services/navbar.service';
import { MenuItem } from 'src/app/models/menu-item.model';
import { Tab } from 'src/app/models/tab.model';
import { ThemeService } from 'src/app/services/theme.service';
@Component({
  selector: 'app-matnav',
  templateUrl: './matnav.component.html',
  styleUrls: ['./matnav.component.scss']
})
export class MatNavComponent implements OnInit {
    public sitename?:BehaviorSubject<string>;
    public menuItems?:BehaviorSubject<MenuItem[]>;
    public secondText?:BehaviorSubject<string>;
    public showText?:BehaviorSubject<boolean>;
    public secondIcons?:BehaviorSubject<ToolIcon[]>;
    public showSecondRow?:BehaviorSubject<boolean>;
    public tabIndex?:BehaviorSubject<number>;
    public tabs?:BehaviorSubject<Tab[]>;
    public showTabs?:BehaviorSubject<boolean>;
    public primaryTheme?:BehaviorSubject<string>;
    public accentTheme?:BehaviorSubject<string>;
    public hoverTheme?:BehaviorSubject<string>;
    public primaryHover:string = '';
    public accentHover:string = '';

    constructor(private navService: NavbarService, public themeService: ThemeService){}

    public ngOnInit(): void {
        this.sitename = this.navService.getName()
        this.secondIcons = this.navService.getSecondIcons()
        this.showSecondRow = this.navService.shouldShowSecondRow()
        this.secondText = this.navService.getSecondText();
        this.menuItems = this.navService.getMenuItems();
        this.tabIndex = this.navService.getTabIndex();
        this.tabs = this.navService.getTabs();
        this.showTabs = this.navService.getShowTabStatus();
        this.showText = this.navService.shouldHideText();

        this.primaryTheme = this.themeService.getPrimaryTheme();
        this.accentTheme = this.themeService.getAccentTheme();
        this.hoverTheme = this.themeService.getHoverTheme();

        combineLatest([this.primaryTheme,this.hoverTheme]).subscribe(([primaryTheme, hoverTheme])=>{
          this.primaryHover = `${primaryTheme} ${hoverTheme}`
        })
        combineLatest([this.accentTheme,this.hoverTheme]).subscribe(([accentTheme, hoverTheme])=>{
          this.accentHover = `${accentTheme} ${hoverTheme}`
        })
        
        this.themeService.changeTheme('darkTheme')
    }

    public setTabIndex(num:number){
      this.navService.setTabIndex(num);
    }

    public validCallback(callback?:Function){
      if (typeof callback === 'function') {
        callback()
      } 
    }
}