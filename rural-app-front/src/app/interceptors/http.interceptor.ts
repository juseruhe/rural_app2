// src/app/interceptors/http.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class HttpTimeoutInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`➡️ HTTP ${req.method} ${req.url}`, req.body);

    return next.handle(req).pipe(
      timeout(20000),  // 20s
      catchError((err) => {
        if (err instanceof TimeoutError) {
          console.error(`⏱️ TIMEOUT en ${req.url}`);
          return throwError(() => new Error('El servidor no responde (timeout)'));
        }
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            console.error(`❌ Error de red / CORS en ${req.url}`);
            return throwError(() => new Error('No se pudo conectar al servidor'));
          }
          console.error(`❌ HTTP ${err.status} en ${req.url}`, err.error);
        }
        return throwError(() => err);
      })
    );
  }
}