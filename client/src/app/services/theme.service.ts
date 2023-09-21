import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
type themes = 'darkTheme' | 'lightTheme'
@Injectable({providedIn:'root'})
export class ThemeService {
    constructor(){}
    private currentTheme = new BehaviorSubject<themes>('lightTheme')
    private primaryTheme = new BehaviorSubject<string>(`${this.currentTheme.value}-primary`);
    private accentTheme = new BehaviorSubject<string>(`${this.currentTheme.value}-accent`);
    private hoverTheme = new BehaviorSubject<string>(`${this.currentTheme.value}-hover`);
    private buttonTheme = new BehaviorSubject<string>(`${this.currentTheme.value}-button`);

    public getPrimaryTheme(){
        return this.primaryTheme
    }

    public getAccentTheme(){
        return this.accentTheme
    }

    public getHoverTheme(){
        return this.hoverTheme
    }

    public getButtonTheme(){
        return this.buttonTheme
    }

    public changeTheme(theme:themes){
        this.currentTheme.next(theme)
        this.primaryTheme.next(`${this.currentTheme.value}-primary`);
        this.accentTheme.next(`${this.currentTheme.value}-accent`)
        this.hoverTheme.next(`${this.currentTheme.value}-hover`)
        this.buttonTheme.next(`${this.currentTheme.value}-button`)
    }

}