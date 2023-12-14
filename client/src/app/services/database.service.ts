import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Collection } from "../models/collections.model";
import { BehaviorSubject, Observable, map, tap } from "rxjs";

type stringOBJ = string | Object

@Injectable({providedIn:'root'})
export class DBService {
    constructor(private http:HttpClient){}

    private collections$ = new BehaviorSubject<Collection[]>([]);

    public createCollection(collectionName:string,dataArr:stringOBJ[]):Observable<Collection>{
        let data = dataArr.map((val)=>typeof val === 'string'? val:JSON.stringify(val))
        return this.http.post<Collection>(`/api/JsonDb/CreateCollection`,{
            collectionName,
            data
        })
    }

    private addToCollections(collection:Collection){
        let collections = this.collections$.value;
        this.collections$.next([...collections,collection]);
    }

    public getCollection(collectionName:string): Observable<Collection>{
        if(this.collections$.value.find((val)=>val.Name === collectionName)){
            return this.collections$.asObservable().pipe(map((val)=>val.find((val)=>val.Name === collectionName)!))
        }

        return this.http.post<Collection>(`/api/JsonDb/GetCollection`, {
            collectionName
        }).pipe(tap((val=>{
            this.addToCollections(val);
        })))
    }

    public addData(collectionName:string,data:stringOBJ){
        return this.http.post<Collection>(`/api/JsonDb/AddData`,{
            collectionName,
            data: typeof data === 'string' ? data : JSON.stringify(data)
        })
    }

    public addMassData(collectionName:string,dataArr:stringOBJ[]){
        let data = dataArr.map((val)=>typeof val === 'string'? val:JSON.stringify(val))
        return this.http.post<Collection>(`/api/JsonDb/AddMassData`,{
            collectionName,
            data
        })
    }
}