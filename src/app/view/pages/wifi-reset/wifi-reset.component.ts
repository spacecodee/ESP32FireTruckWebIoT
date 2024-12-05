import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WebSocketService } from '@core/services/websocket/websocket.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-wifi-reset',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wifi-reset.component.html',
})
export class WifiResetComponent {
  constructor(
    private readonly webSocketService: WebSocketService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  confirmReset(): void {
    if (
      confirm(
        'Are you sure you want to reset the WiFi configuration? This will disconnect the ESP32 and you will need to reconfigure the WiFi network.',
      )
    ) {
      this.webSocketService.sendMessage({ command: 'wifi_reset' });
    }
  }

  ngOnInit(): void {
    this.webSocketService.messages$.subscribe((message) => {
      if (message.type === 'wifi_reset' && message.status === 'resetting') {
        alert('WiFi is resetting. You will be logged out.');
        this.authService.logout();
      }
    });
  }
}