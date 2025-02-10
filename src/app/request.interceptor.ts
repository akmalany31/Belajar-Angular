import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request Interceptor', request);
    // Gabisa ngubah yang ada karena sifatnya immutable (tidak bisa diubah setelah dibuat). Jadi bisanya clone lalu modify. 
    if(request.method === 'POST'){
    const newRequest = request.clone({ 
      headers : new HttpHeaders().set('token', '1234abcd')
    });
    return next.handle(newRequest);
  }
    return next.handle(request);
  }
}
