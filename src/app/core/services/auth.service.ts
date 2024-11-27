import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor() {}

  login(username: string, password: string): boolean {
    if (username === 'test' && password === 'test') {
      this.isAuthenticated.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }
}
