import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, share } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { DBService } from 'src/app/services/database.service';
import { Collection } from 'src/app/models/collections.model';
import { AuthService } from 'src/app/services/authorize.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor( private navService:NavigationService,private router: Router){}

  ngOnInit(): void {
    // Get Themes
    this.navService.showHomeBar()
  }
}