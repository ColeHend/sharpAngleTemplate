import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, share, shareReplay, tap } from 'rxjs';
import { RegisterReq } from '../models/requests/register.model';
type logType = "log" | "warn" | "error";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  // Token Management
  private setToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  public getToken = () => localStorage.getItem('token');

  // manage user
  private username = new BehaviorSubject<string>('');
  public getUsername = () => this.username;
  public getPassword = () => this.password;

  private password = new BehaviorSubject<string>('');
  public setUsername = (username: string) => {
    this.username.next(username);
  };
  public setPassword = (pass: string) => {
    this.password.next(pass);
  };

  // Login Status

  private loginValid = new BehaviorSubject<boolean>(false);
  public getLoginStatus = () => this.loginValid;
  public switchLoginStatus = (status: boolean) => {
    this.registerValid.next(status);
  };

  private registerValid = new BehaviorSubject<boolean>(false);
  public getRegisterStatus = () => this.registerValid;
  public switchRegisterStatus = (status: boolean) => {
    this.loginValid.next(status);
  };

  private authenticated = new BehaviorSubject<boolean>(false);
  public getAuthenticatedStatus = () => this.authenticated;
  public switchAuthenticatedStatus = (status: boolean) => {
    this.authenticated.next(status);
  };

  private loginOnRegister = new BehaviorSubject<boolean>(false);
  public getLoginOnRegister = () => this.loginOnRegister;
  public setLoginOnRegister = (value: boolean) => {
    this.loginOnRegister.next(value);
  };
  // Is logged in handler
  private LoggedInValue = new BehaviorSubject<boolean>(false);
  public getLoggedInValue = ()=> this.LoggedInValue
  public setLoggedInValue = (value:boolean)=>{this.LoggedInValue.next(value)};

  public logger(value:string | Object, type:logType="log"){
    if (type === "log") {
        console.log(value);
    } else if (type === "warn") {
        console.warn(value);
    } else {
        console.error(value);
    }
}
/**
 * Returns a user's values or false if not logged in
 * @returns {Promise<Observable<boolean | Object>>}
 */
  public async isLoggedIn() {
    this.logger("Running Is Logged in!");
    
    this.http.post<userResponse>('/api/Users/Verify', {}).pipe(catchError((err,value) => {
        this.logger(`err ${err}|`,"error");
        if (value === null && err) {
            this.LoggedInValue.next(false);
            return of(false);
        }
        return value
      })).subscribe((value)=>{
          if (typeof value !== 'boolean') {
            this.logger(value);
            this.setUsername(value.username)
            this.setLoggedInValue(true);
        }
    });
    return this.getLoggedInValue()
  }
  /**
   * Get the user's current login status
   */
  public get loginStatus(){
    return this.LoggedInValue.value
  }
  // Login And Register Server Calls
  /**
   * A call to the server to register a new user.
   * @param username {string} The Username
   * @param password {string} The Password
   * @param moreData {string} Any additional data to be stored as a string
   * @returns {Observable<Object>}
   */
  public register(username: string, password: string, moreData: string = '') {
    return this.http.post('/api/Users/Register', {
      username,
      password,
      moreData,
    }).pipe(catchError(err=>{
        this.logger(`Error: ,${err}`,'error');
        return err
    }));
  }
  /**
   * A call to the server to login a existing user.
   * @param username {string} The Username
   * @param password {string} The Password
   * @returns {Observable<Object>}
   */
  public login(username: string, password: string) {
    let req: RegisterReq = {
      username,
      password,
    };
    let response = this.http.post<defResponse>('/api/Users/Login', req);
    return response.pipe(
        catchError((err)=>{
            this.logger(`Error: ,${err}`,'error');
            this.LoggedInValue.next(false);
            return of(err)
        }),
      tap((val) => {
          if (val.data) {
            this.setToken(val.data);
            this.LoggedInValue.next(true);
        }
      })
    );
  }

  /**
   * Logout the user
   */
  public logout(){
    this.setLoggedInValue(false);
    this.setToken("");
  }
}
/**
 * A Json object with a data property
 */
interface defResponse {
  data: string;
}
/**
 * 
 */
interface userResponse {
    id: number | null;
    username: string;
    moreData: string;
    password: string | null;
    passHash: string | null;
    passSalt: string | null;
}