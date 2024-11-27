import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '@core/services/config.service';
import { ThemeToggleComponent } from '@app/shared/components/theme-toggle/theme-toggle.component';
import { LogoutButtonComponent } from '@app/shared/components/logout-button/logout-button.component';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ThemeToggleComponent,
    LogoutButtonComponent,
  ],
  templateUrl: './config.component.html',
})
export class ConfigComponent {
  ip = '192.168.215.4';
  port = '81';

  constructor(
    private config: ConfigService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.config.updateConfig(this.ip, this.port);
    this.router.navigate(['/dashboard']);
  }
}
