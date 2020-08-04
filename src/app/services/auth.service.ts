import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserCredentials } from '../auth/login/login.component';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { handleHttpError } from '../utils/http';
import { PersistenceService } from '../utils/persistence.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private persistence: PersistenceService
  ) {}

  login(body: UserCredentials): Observable<any> {
    return this.http.post(environment.apiUrl + '/auth', body).pipe(
      catchError(handleHttpError),
      tap((cred) => {
        this.persistence.persistUserCredentials(cred);
      })
    );
  }

  logout(): void {
    this.persistence.removeCredentials();
  }
}
