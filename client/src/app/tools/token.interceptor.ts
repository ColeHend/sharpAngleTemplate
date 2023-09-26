import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authorize.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let protocall = window.location.protocol;
    let host = window.location.host;

    let token = this.auth.getToken();
    if (token && token.length > 5) {
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${this.auth.getToken()}`
  
        }
      });
    }
    
    return next.handle(request);
  }
}