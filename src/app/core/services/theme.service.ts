import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.isDarkModePreferred());
  darkMode$ = this.darkMode.asObservable();

  constructor() {}

  private isDarkModePreferred(): boolean {
    const stored = localStorage.getItem('darkMode');
    if (stored) {
      return JSON.parse(stored);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
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
    if (this.darkMode.value) {
      document.documentElement.classList.add('dark');
    }
  }
}
