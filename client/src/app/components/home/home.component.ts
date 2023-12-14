import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, share } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { DBService } from '../../services/database.service';
import { Collection } from '../../models/collections.model';
import { AuthService } from '../../services/authorize.service';
import { NavigationService } from '../../services/navigation.service';
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