import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { DBService } from 'src/app/services/database.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public primaryTheme?:BehaviorSubject<string>;
  public accentTheme?:BehaviorSubject<string>;
  public hoverTheme?:BehaviorSubject<string>;
  constructor(private themeService: ThemeService, private dbService:DBService){}

  ngOnInit(): void {
    this.primaryTheme = this.themeService.getPrimaryTheme();
    this.accentTheme = this.themeService.getAccentTheme();
    this.hoverTheme = this.themeService.getHoverTheme();
    let collection = this.dbService.createCollection("test",['test 1', 'test 2'])
    collection.subscribe((value=>{
      console.log('collection ', value);
    }))
    
  }
}