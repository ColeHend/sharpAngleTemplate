import { Injectable } from '@angular/core';
import { BehaviorSubject, share, shareReplay, tap } from 'rxjs';
export type themes = 'darkTheme' | 'lightTheme'
@Injectable({providedIn:'root'})
export class ThemeService {
    constructor(){}
    public readonly allThemes = ['darkTheme', 'lightTheme'];
    private currentTheme = new BehaviorSubject<themes>('lightTheme')
    private primaryTheme = new BehaviorSubject<string>(`${this.currentTheme.value}-primary`);
    private accentTheme = new BehaviorSubject<string>(`${this.currentTheme.value}-accent`);
    private hoverTheme = new BehaviorSubject<string>(`${this.currentTheme.value}-hover`);
    private buttonTheme = new BehaviorSubject<string>(`${this.currentTheme.value}-button`);

    public getTheme(){return this.currentTheme.getValue()}

    public getPrimaryTheme(){  return this.primaryTheme.asObservable().pipe(shareReplay(1))}
    public getCustomPrimaryTheme(className:string){return this.getPrimaryTheme().pipe(tap((t)=>t+` ${className}`))}

    public getAccentTheme(){ return this.accentTheme.asObservable().pipe(shareReplay(1)) }
    public getCustomAccentTheme(className:string){return this.getAccentTheme().pipe(tap((t)=>t+` ${className}`))}

    public getHoverTheme(){ return this.hoverTheme.asObservable().pipe(shareReplay(1)) }
    public getCustomHoverTheme(className:string){return this.getHoverTheme().pipe(tap((t)=>t+` ${className}`))}

    public getButtonTheme(){ return this.buttonTheme.asObservable().pipe(shareReplay(1)) }
    public getCustomButtonTheme(className:string){return this.getButtonTheme().pipe(tap((t)=>t+` ${className}`))}


    public changeTheme(theme:themes){
        this.currentTheme.next(theme)
        this.primaryTheme.next(`${this.currentTheme.value}-primary`);
        this.accentTheme.next(`${this.currentTheme.value}-accent`)
        this.hoverTheme.next(`${this.currentTheme.value}-hover`)
        this.buttonTheme.next(`${this.currentTheme.value}-button`)
    }

}