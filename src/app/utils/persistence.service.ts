import { Injectable } from '@angular/core';
import { UserCredentials } from '../auth/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor() {}

  persistUserCredentials(token: { token: string }): void {
    localStorage.setItem('user', JSON.stringify(token));
  }

  getUserCredentials(): { token: string } | null {
    return JSON.parse(localStorage.getItem('user'));
  }

  removeCredentials(): void {
    localStorage.clear();
  }
}
