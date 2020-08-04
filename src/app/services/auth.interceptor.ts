import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistenceService } from '../utils/persistence.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistence: PersistenceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const { token } = this.persistence.getUserCredentials();

    if (!token) {
      return next.handle(request);
    }
    const headers = request.clone({
      headers: request.headers.set('Authorization', token),
    });
    return next.handle(headers);
  }
}
