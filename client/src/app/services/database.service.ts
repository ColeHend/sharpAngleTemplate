import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

type stringOBJ = string | Object

@Injectable({providedIn:'root'})
export class DBService {
    baseUrl:string = 'localhost';
    constructor(private http:HttpClient){
        this.baseUrl = document.getElementsByTagName('base')[0].href
    }
    getBaseURL(){
        return document.getElementsByTagName('base')[0].href
    }
    createCollection(collectionName:string,dataArr:stringOBJ[]){
        let data = dataArr.map((val)=>typeof val === 'string'? val:JSON.stringify(val))
        return this.http.post(`${this.baseUrl}api/JsonDb/CreateCollection`,{
            collectionName,
            data
        })
    }
    getCollection(collectionName:string){
        return this.http.post(`${this.baseUrl}api/JsonDb/GetCollection`,{
            collectionName
        })
    }
    addData(collectionName:string,data:stringOBJ){
        return this.http.post(`${this.baseUrl}api/JsonDb/AddData`,{
            collectionName,
            data: typeof data === 'string' ? data : JSON.stringify(data)
        })
    }
    addMassData(collectionName:string,dataArr:stringOBJ[]){
        let data = dataArr.map((val)=>typeof val === 'string'? val:JSON.stringify(val))
        return this.http.post(`${this.baseUrl}api/JsonDb/AddMassData`,{
            collectionName,
            data
        })
    }
}