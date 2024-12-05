import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly AUTH_KEY = 'auth_token';
  private readonly isAuthenticated = new BehaviorSubject<boolean>(false); // Initialize with false
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private readonly router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.AUTH_KEY);
      if (token) {
        this.isAuthenticated.next(true);
      }
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'test' && password === 'test') {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.AUTH_KEY, 'logged_in');
      }
      this.isAuthenticated.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.AUTH_KEY);
    }
    this.isAuthenticated.next(false);
    this.router
      .navigate(['/login'])
      .then(() => console.log('Navigated to login'));
  }
}
