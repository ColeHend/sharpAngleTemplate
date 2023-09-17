import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Collection } from "../models/collections.model";
import { Observable } from "rxjs";

type stringOBJ = string | Object

@Injectable({providedIn:'root'})
export class DBService {
    constructor(private http:HttpClient){}

    createCollection(collectionName:string,dataArr:stringOBJ[]):Observable<Collection>{
        let data = dataArr.map((val)=>typeof val === 'string'? val:JSON.stringify(val))
        return this.http.post<Collection>(`/api/JsonDb/CreateCollection`,{
            collectionName,
            data
        })
    }
    getCollection(collectionName:string){
        return this.http.post<Collection>(`/api/JsonDb/GetCollection`,{
            collectionName
        })
    }
    addData(collectionName:string,data:stringOBJ){
        return this.http.post<Collection>(`/api/JsonDb/AddData`,{
            collectionName,
            data: typeof data === 'string' ? data : JSON.stringify(data)
        })
    }
    addMassData(collectionName:string,dataArr:stringOBJ[]){
        let data = dataArr.map((val)=>typeof val === 'string'? val:JSON.stringify(val))
        return this.http.post<Collection>(`/api/JsonDb/AddMassData`,{
            collectionName,
            data
        })
    }
}