// view/pages/dashboard/main-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '@app/shared/components/theme-toggle/theme-toggle.component';
import { LogoutButtonComponent } from '@app/shared/components/logout-button/logout-button.component';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { ConnectionStatusComponent } from '@shared/components/connection-status/connection-status.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ThemeToggleComponent,
    LogoutButtonComponent,
    SidebarComponent,
    RouterOutlet,
    ConnectionStatusComponent,
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  constructor(public webSocketService: WebSocketService) {}
}
