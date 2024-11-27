import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly defaultIp = '192.168.215.4';
  private readonly defaultPort = '81';

  private readonly esp32Config = new BehaviorSubject<{
    ip: string;
    port: string;
  }>({
    ip: this.defaultIp,
    port: this.defaultPort,
  });
  esp32Config$ = this.esp32Config.asObservable();

  updateConfig(ip: string, port: string): void {
    this.esp32Config.next({ ip, port });
  }

  getWebSocketUrl(): string {
    const { ip, port } = this.esp32Config.value;
    return `ws://${ip}:${port}`;
  }

  constructor() {}
}
