import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserCredentials } from '../auth/login/login.component';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleHttpError } from '../utils/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(body: UserCredentials): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth', body).pipe(
      catchError(handleHttpError)
    )
  }
}
