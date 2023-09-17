import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { DBService } from 'src/app/services/database.service';
import { Collection } from 'src/app/models/collections.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public primaryTheme?:BehaviorSubject<string>;
  public accentTheme?:BehaviorSubject<string>;
  public hoverTheme?:BehaviorSubject<string>;
  public testCollect?:Collection;
  constructor(private themeService: ThemeService, private dbService:DBService){}

  ngOnInit(): void {
    this.primaryTheme = this.themeService.getPrimaryTheme();
    this.accentTheme = this.themeService.getAccentTheme();
    this.hoverTheme = this.themeService.getHoverTheme();
    this.dbService.getCollection("test").subscribe(val=>{
      this.testCollect = val;
    });
  }
}