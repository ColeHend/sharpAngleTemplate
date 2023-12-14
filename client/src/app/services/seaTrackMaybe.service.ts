// import { Injectable, OnInit } from "@angular/core";
// import { BehaviorSubject, combineLatest, shareReplay } from "rxjs";
// import { Tile } from "../components/seaTracker/board/board.component";
// import { insertItemEveryNth } from "../tools/tools";

// @Injectable({providedIn:'root'})
// export class SeaTrackerService implements OnInit {
    
//     public setTileColumnSize(index:number,direction: colDirection, changeType:change){
//         let tilesArr:Array<any> = this.getTilesValue();
//         if (direction === "left") {
//             if (tilesArr[index].cols > 1 && changeType === "decrease") {
//                 tilesArr[index].cols -= 1;
//                 for (let i = 0; i < tilesArr[index].rows; i++) {
//                     let placeIndex = (index - 1) + (i * this.getRowsValue());
//                     tilesArr = tilesArr.splice(placeIndex,0,this.tileTemplate(`Tile ${placeIndex}`))
//                 }
//                 tilesArr = tilesArr.slice(index-1, 1);
//             }
//             if (changeType === "increase" && tilesArr[index-1].rows === tilesArr[index].rows && tilesArr[index-1].cols === 1) {
//                 tilesArr[index].cols += 1;
//                 for (let i = 0; i < tilesArr[index].rows; i++){
//                     let placeIndex = index - 1  + (i * this.getRowsValue());
//                     tilesArr = tilesArr.slice(placeIndex, 1);
//                 }   
//             } 
//         } else {
//             if (tilesArr[index].cols > 1 && changeType === "decrease") {
//                 tilesArr[index].cols -= 1;
//                 for (let i = 0; i < tilesArr[index].rows; i++) {
//                     let placeIndex = index + tilesArr[index].cols + (i * this.getRowsValue());
//                     tilesArr = tilesArr.splice(placeIndex,0,this.tileTemplate(`Tile ${placeIndex}`))
//                 }
//                 tilesArr = tilesArr.slice(index-1, 1);
//             }
//             if (changeType === "increase" && tilesArr[index+1].rows === tilesArr[index].rows && tilesArr[index+1].cols === 1) {
//                 tilesArr[index].cols += 1;
//                 tilesArr = tilesArr.slice(index+1, 1)
//             } 
//         }
//         this.setTiles(tilesArr);
//     }
//     getTilesValue() {
//         throw new Error("Method not implemented.");
//     }
//     getRowsValue() {
//         throw new Error("Method not implemented.");
//     }
//     tileTemplate(arg0: string): any {
//         throw new Error("Method not implemented.");
//     }
//     setTiles(tilesArr: any) {
//         throw new Error("Method not implemented.");
//     }
// }
// type colDirection = "left" | "right";
// type rowDirection = "up" | "down"
// type change = "increase" | "decrease"