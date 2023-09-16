import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';
@Component({
  selector: 'app-bodyBase',
  templateUrl: './body-base.component.html',
  styleUrls: ['./body-base.component.scss']
})
export class BodyBaseComponent implements OnInit{
  public primaryTheme?:string;
  public accentTheme?:string;
  public hoverTheme?:string;
  constructor(private themeService: ThemeService){}
  ngOnInit(): void {
    this.themeService.getPrimaryTheme().subscribe(val=>{
      this.primaryTheme = val;
    })
    this.themeService.getAccentTheme().subscribe(val=>{
      this.accentTheme = val;
    });
    this.themeService.getHoverTheme().subscribe(val=>{
      this.hoverTheme = val;
    });
  }
}