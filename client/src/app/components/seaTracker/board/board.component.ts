import { Component, OnInit } from "@angular/core";
import { Observable, combineLatest } from "rxjs";
import { SeaTrackerService } from "src/app/services/seaTracker.service";


@Component({
    selector: 'app-seaTrackerBoard',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
  })
  export class SeaTrackBoard implements OnInit{
    constructor(private seaTrackService:SeaTrackerService){}
    public tiles: Observable<Tile[]>  = this.seaTrackService.getTiles();
    public columns = this.seaTrackService.getColumns();
    public rows = this.seaTrackService.getRows();
    public rowHeight = '100px';
    public ngOnInit(): void {
      
    }
  }

  export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
  }