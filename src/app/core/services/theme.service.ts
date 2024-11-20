import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.darkMode.next(this.isDarkModePreferred());
    }
  }

  private isDarkModePreferred(): boolean {
    const stored = localStorage.getItem('darkMode');
    if (stored) {
      return JSON.parse(stored);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const isDark = !this.darkMode.value;
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    this.darkMode.next(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.darkMode.value) {
      document.documentElement.classList.add('dark');
    }
  }
}
