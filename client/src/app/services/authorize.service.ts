import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { RegisterReq } from '../models/requests/register.model';
import { switchMap, tap, timeout } from 'rxjs/operators';
import { UserResponse } from '../models/responses/userResponse.model';



@Injectable({ providedIn: 'root' })
/**
 * Service for managing user authentication and authorization.
 */
export class AuthService {
    /**
     * Constructor for AuthService.
     * @param http - The HttpClient instance to make HTTP requests.
     */
    constructor(private http: HttpClient) {}

    /**
     * Sets the token in local storage.
     * @param token - The token to be set.
     */
    private setToken = (token: string) => {
        localStorage.setItem('token', token);
    };

    /**
     * Gets the token from local storage.
     * @returns The token from local storage.
     */
    public getToken = () => localStorage.getItem('token');

    /**
     * BehaviorSubject for managing the username.
     */
    private username = new BehaviorSubject<string>('');

    /**
     * Gets the username from the username BehaviorSubject.
     * @returns The username from the username BehaviorSubject.
     */
    public getUsername = () => this.username;

    /**
     * Sets the username in the username BehaviorSubject.
     * @param username - The username to be set.
     */
    public setUsername = (username: string) => {
        this.username.next(username);
    };

    /**
     * BehaviorSubject for managing the password.
     */
    private password = new BehaviorSubject<string>('');

    /**
     * Sets the password in the password BehaviorSubject.
     * @param pass - The password to be set.
     */
    public setPassword = (pass: string) => {
        this.password.next(pass);
    };

    /**
     * Gets the password from the password BehaviorSubject.
     * @returns The password from the password BehaviorSubject.
     */
    public getPassword = () => this.password.getValue();
    
    /** 
     * BehaviorSubject for managing the login status.
     */
    private loginValid = new BehaviorSubject<boolean>(false);

    /**
     * Gets the login status BehaviorSubject.
     * @returns The login status BehaviorSubject.
     */
    public getLoginStatus = () => this.loginValid;

    /**
     * Sets the login status in the login status BehaviorSubject.
     * @param status - The login status to be set.
     */
    public switchLoginStatus = (status: boolean) => {
        this.loginValid.next(status);
    };

    /**
     * BehaviorSubject for managing the register status.
     */
    private registerValid = new BehaviorSubject<boolean>(false);

    /**
     * Gets the register status BehaviorSubject.
     * @returns The register status BehaviorSubject.
     */
    public getRegisterStatus = () => this.registerValid;

    /**
     * Sets the register status in the register status BehaviorSubject.
     * @param status - The register status to be set.
     */
    public switchRegisterStatus = (status: boolean) => {
        this.registerValid.next(status);
    };

    /**
     * BehaviorSubject for managing the authenticated status.
     */
    private authenticated = new BehaviorSubject<boolean>(false);

    /**
     * Gets the authenticated status BehaviorSubject.
     * @returns The authenticated status BehaviorSubject.
     */
    public getAuthenticatedStatus = () => this.authenticated;

    /**
     * Sets the authenticated status in the authenticated status BehaviorSubject.
     * @param status - The authenticated status to be set.
     */
    public switchAuthenticatedStatus = (status: boolean) => {
        this.authenticated.next(status);
    };

    /**
     * BehaviorSubject for managing the login on register status.
     */
    private loginOnRegister = new BehaviorSubject<boolean>(false);

    /**
     * Gets the login on register status BehaviorSubject.
     * @returns The login on register status BehaviorSubject.
     */
    public getLoginOnRegister = () => this.loginOnRegister;

    /**
     * Sets the login on register status in the login on register status BehaviorSubject.
     * @param value - The login on register status to be set.
     */
    public setLoginOnRegister = (value: boolean) => {
        this.loginOnRegister.next(value);
    };

    /**
     * BehaviorSubject for managing the logged in value.
     */
    private loggedInValue = new BehaviorSubject<boolean>(false);

    /**
     * Gets the logged in value BehaviorSubject.
     * @returns The logged in value BehaviorSubject.
     */
    public getLoggedInValue = () => this.loggedInValue;

    /**
     * Sets the logged in value in the logged in value BehaviorSubject.
     * @param value - The logged in value to be set.
     */
    public setLoggedInValue = (value: boolean) => {
        this.loggedInValue.next(value);
    };

    /**
     * Logs a message to the console.
     * @param value - The message to be logged.
     * @param type - The type of message to be logged.
     */
    public logger(value: string | Object, type: 'log' | 'warn' | 'error' = 'log') {
        if (type === 'log') {
            console.log(value);
        } else if (type === 'warn') {
            console.warn(value);
        } else {
            console.error(value);
        }
    }

    /**
     * Checks if the user is logged in.
     * @returns An Observable that emits a boolean indicating if the user is logged in.
     */
    public isLoggedIn(): Observable<boolean> {
        this.alertLog.subscribe((value)=>{
            console.log(value);
        })
        this.logger('Running Is Logged in!');

        return this.http.post<{data: UserResponse}>('/api/Users/Verify', {}).pipe(
            tap(({data}) => {
                this.setLoggedInValue(true);
                console.log(data);
                if (data && data.Username) {                 
                    this.setUsername(data.Username);
                    this.setLoggedInValue(true);
                }
            }),
            map(() => this.getLoggedInValue().value),
            catchError((err) => {
                this.setLoggedInValue(false);
                return of(false);
            })
        );
    }

    /**
     * Gets the user's current login status.
     */
    public get loginStatus() {
        return this.loggedInValue.value;
    }

    /**
     * Makes a call to the server to register a new user.
     * @param username - The username of the new user.
     * @param password - The password of the new user.
     * @param moreData - Any additional data to be stored as a string.
     * @returns An Observable that emits the response from the server.
     */
    public register(username: string, password: string, moreData: string = ''): Observable<any> {

        return this.http.post('/api/Users/Register', {
            username,
            password,
            moreData,
        }).pipe(
            catchError(err => {
                this.logger(`Error: ,${err}`, 'error');
                return throwError(() => err);
            })
        );
    }
    public alertLog = new BehaviorSubject("");
    /**
     * Makes a call to the server to login an existing user.
     * @param username - The username of the user to be logged in.
     * @param password - The password of the user to be logged in.
     * @returns An Observable that emits the response from the server.
     */
    public login(username: string, password: string): Observable<any> {
        return this.http.post<{ data: string }>('/api/Users/Login', {
            "Username": username,
            "Password": password,
        }).pipe(tap((value)=>{
            console.log(value);
            this.alertLog.next(`${value}`)
            this.setToken(value.data);
            localStorage.setItem('token', value.data)
    }));
    }

    /**
     * Logs out the user.
     */
    public logout() {
        this.setLoggedInValue(false);
        this.setToken('');
    };
}