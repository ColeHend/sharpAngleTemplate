import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

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
        let response = this.http.post("/api/Users/Login",{
            username,
            password
        });
        return response.pipe(tap((val)=>{
            this.setToken(JSON.stringify(val))
        }));
    }
}