import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss',
})
export class LogoutButtonComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
