import { Component, OnInit } from "@angular/core";
import { NavigationService } from "src/app/services/navigation.service";

@Component({
    selector: 'app-seaTracker',
    templateUrl: './seaTracker.component.html',
    styleUrls: ['./seaTracker.component.scss']
  })
  export class SeaTrackerComponent implements OnInit {
    constructor(private navService: NavigationService){}
    public ngOnInit(): void {
        this.navService.showSeaTrackBar();
    }

  }