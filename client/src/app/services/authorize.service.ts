import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { RegisterReq } from "../models/requests/register.model";

@Injectable({providedIn:'root'})
export class AuthService {
    constructor(private http:HttpClient) {}
    private setToken(token:string){
        localStorage.setItem("token", token);
    }
    public getToken()
    {
        return localStorage.getItem("token");
    }
    public register(username:string,password:string,moreData:string = ""){
        return this.http.post("/api/Users/Register",{
            username,
            password,
            moreData
        });
    }
    public login(username:string,password:string){
        let req:RegisterReq = {
            username,
            password
        }
        let response = this.http.post<defResponse>("/api/Users/Login",req);
        return response.pipe(tap((val)=>{
            this.setToken(val.data)
        }));
    }
}
interface defResponse {
    data:string
}