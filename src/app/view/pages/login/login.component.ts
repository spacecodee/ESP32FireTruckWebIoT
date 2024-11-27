import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  onSubmit(): void {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']).then((r) => console.log(r));
    } else {
      this.error = 'Invalid credentials';
    }
  }
}
