import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenjwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let interceptorRequest = request
    let token = sessionStorage.getItem('token')

    if (request.url == "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json") {
      return next.handle(interceptorRequest);
    }

    else if (request.url == "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json") {
      return next.handle(interceptorRequest);
    }

    if (token != null) {
      interceptorRequest = request.clone({
        headers: interceptorRequest.headers.set('Authorization', 'Bearer ' + token)
      })
    }

    return next.handle(interceptorRequest);
  }


}
