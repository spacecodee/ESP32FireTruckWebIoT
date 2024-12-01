import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '@core/services/websocket/websocket.service';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './connection-status.component.html',
  styleUrl: './connection-status.component.scss',
})
export class ConnectionStatusComponent {
  constructor(public webSocketService: WebSocketService) {}
}
