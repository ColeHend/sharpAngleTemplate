import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, combineLatest, shareReplay } from "rxjs";
import { Tile } from "../components/seaTracker/board/board.component";
import { insertItemEveryNth } from "../tools/tools";

@Injectable({providedIn:'root'})
export class SeaTrackerService implements OnInit {
    public ngOnInit(): void {
        let shouldHaveTileNum = (this.getColumnValue() * this.getRowsValue())
        if (this.getTilesValue().length < shouldHaveTileNum) {
          const tileArr = [];
          for (let i = 0; i < shouldHaveTileNum; i++) {
            tileArr.push(this.tileTemplate(`Tile ${i+1}`))
          }
          this.setTiles(tileArr)
        }
    }
    public tileTemplate = (text:string,cols=1,rows=1,color='lightblue')=>({
      color,
      cols,
      rows,
      text
    });
    private columns = new BehaviorSubject(5);
    private rows = new BehaviorSubject(5);
    private tiles = new BehaviorSubject<Tile[]>([]);
    public getColumnValue(){ return this.columns.getValue() }
    public getColumns(){return this.columns.asObservable().pipe(shareReplay(1))}
    public addColumn(){
        let oldColumnVal = this.getColumnValue()
        let oldTiles = this.getTilesValue();
        this.columns.next(oldColumnVal+1);
        let newTileArr = insertItemEveryNth(oldTiles, this.tileTemplate('New Column Item'), oldColumnVal)
        this.setTiles(newTileArr);
    }

    public getRowsValue(){ return this.rows.getValue() }
    public getRows(){return this.rows.asObservable().pipe(shareReplay(1))}
    public addRow(){
        this.rows.next(this.getRowsValue()+1);
        const newTiles:Tile[] = [];
        new Array(this.getColumnValue()).forEach(()=>{
            newTiles.push(this.tileTemplate('New Row Item'))
        })
        this.setTiles([...this.getTilesValue(),...newTiles])
    }

    public getTilesValue(){ return this.tiles.getValue(); }
    public getTiles(){ return this.tiles.asObservable().pipe(shareReplay(1)) }
    public setTiles(tiles:Tile[]){ this.tiles.next(tiles) }
    public setTileColumnSize(index:number,direction: colDirection, changeType:change){
        let tilesArr = this.getTilesValue();
        if (direction === "left") {
            if (tilesArr[index].cols > 1 && changeType === "decrease") {
                tilesArr[index].cols -= 1;
                for (let i = 0; i < tilesArr[index].rows; i++) {
                    let placeIndex = (index - 1) + (i * this.getRowsValue());
                    tilesArr = tilesArr.splice(placeIndex,0,this.tileTemplate(`Tile ${placeIndex}`))
                }
                tilesArr = tilesArr.slice(index-1, 1);
            }
            if (changeType === "increase" && tilesArr[index-1].rows === tilesArr[index].rows && tilesArr[index-1].cols === 1) {
                tilesArr[index].cols += 1;
                for (let i = 0; i < tilesArr[index].rows; i++){
                    let placeIndex = index - 1  + (i * this.getRowsValue());
                    tilesArr = tilesArr.slice(placeIndex, 1);
                }   
            } 
        } else {
            if (tilesArr[index].cols > 1 && changeType === "decrease") {
                tilesArr[index].cols -= 1;
                for (let i = 0; i < tilesArr[index].rows; i++) {
                    let placeIndex = index + tilesArr[index].cols + (i * this.getRowsValue());
                    tilesArr = tilesArr.splice(placeIndex,0,this.tileTemplate(`Tile ${placeIndex}`))
                }
                tilesArr = tilesArr.slice(index-1, 1);
            }
                if (changeType === "increase" && tilesArr[index+1].rows === tilesArr[index].rows && tilesArr[index+1].cols === 1) {
                    tilesArr[index].cols += 1;
                    tilesArr = tilesArr.slice(index+1, 1)
                } 
        }
        this.setTiles(tilesArr);
    }
    public setTileRowSize(index:number,direction: rowDirection){
        const tilesArr = this.getTilesValue();
        const tile = tilesArr[index];

    }
}
type colDirection = "left" | "right";
type rowDirection = "up" | "down"
type change = "increase" | "decrease"