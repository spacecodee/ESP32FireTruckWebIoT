import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

type Direction =
  | 'forward'
  | 'backward'
  | 'left'
  | 'right'
  | 'forward-left'
  | 'forward-right'
  | 'backward-left'
  | 'backward-right'
  | 'stop';

interface TruckCommand {
  command: 'move' | 'pump';
  value: Direction | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TruckControlService {
  private socket$: WebSocketSubject<TruckCommand>;
  private readonly WS_ENDPOINT = 'ws://your-esp32-ip:port';

  constructor() {
    this.socket$ = new WebSocketSubject(this.WS_ENDPOINT);
  }

  move(direction: Direction): void {
    this.socket$.next({
      command: 'move',
      value: direction,
    });
  }

  setPump(active: boolean): void {
    this.socket$.next({
      command: 'pump',
      value: active,
    });
  }

  disconnect(): void {
    this.socket$.complete();
  }
}
