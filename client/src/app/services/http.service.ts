import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class HttpService {
    constructor(private http:HttpClient){}
    private setHeaders(header:HttpHeaders, newHeaders:any){
        let newHead = Object.entries(newHeaders);

        for (const [key, value] of newHead) {
            if (typeof key === 'string') {
                if (Array.isArray(value) && value.every(val=>typeof val === 'string')) {
                    header.set(key,value);
                } else if(typeof value === 'string') {
                    header.set(key,value);
                }
            }
        }
        return header
    }
    public get(url:string,headers = null){
        
        let header = new HttpHeaders();
        let token = localStorage.getItem("token") ?? '';

        header.set("Authorization",token);

        if (headers && typeof headers === 'object') {
            header = this.setHeaders(header, headers);
        }
        return this.http.get(url,{headers:header})
    }
    public post(url:string,body = {}, headers = null){
        
        let header = new HttpHeaders();
        let token = localStorage.getItem("token") ?? '';

        header.set("Authorization",token);

        if (headers && typeof headers === 'object') {
            header = this.setHeaders(header, headers);
        }
        return this.http.post(url,body,{headers:header})
    }
    public put(url:string,body = {},headers = null){
        
        let header = new HttpHeaders();
        let token = localStorage.getItem("token") ?? '';

        header.set("Authorization",token);

        if (headers && typeof headers === 'object') {
            header = this.setHeaders(header, headers);
        }
        return this.http.put(url,body,{headers:header})
    }
    public delete(url:string,body = {},headers = null){
        
        let header = new HttpHeaders();
        let token = localStorage.getItem("token") ?? '';

        header.set("Authorization",token);

        if (headers && typeof headers === 'object') {
            header = this.setHeaders(header, headers);
        }
        return this.http.post(url,{headers:header})
    }
}