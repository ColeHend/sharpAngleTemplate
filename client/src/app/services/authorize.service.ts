import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { RegisterReq } from "../models/requests/register.model";

@Injectable({providedIn:'root'})
export class AuthService {  
    constructor(private http:HttpClient) {}
    // Token Management
    private setToken = (token:string)=>{ localStorage.setItem("token", token); }
    public getToken = ()=> localStorage.getItem("token");
    
    // manage user
    private username = new BehaviorSubject<string>("");
    private password = new BehaviorSubject<string>("");
    public getUsername = ()=>this.username;
    public getPassword = ()=>this.password;
    public setUsername = (username:string)=>{this.username.next(username)};
    public setPassword = (pass:string)=>{this.password.next(pass)};
    
    // Login Status
    private loginValid = new BehaviorSubject<boolean>(false);
    private registerValid = new BehaviorSubject<boolean>(false);
    private authenticated = new BehaviorSubject<boolean>(false);
    public getLoginStatus = () => this.loginValid;
    public switchLoginStatus = (status:boolean)=>{ this.registerValid.next(status); }
    public getRegisterStatus = ()=> this.registerValid;
    public switchRegisterStatus = (status:boolean)=>{ this.loginValid.next(status); }
    public getAuthenticatedStatus = ()=> this.authenticated;
    public switchAuthenticatedStatus = (status:boolean)=>{ this.authenticated.next(status); }

    // Login And Register
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