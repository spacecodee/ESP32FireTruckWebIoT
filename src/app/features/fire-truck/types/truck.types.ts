// src/app/features/fire-truck/types/truck.types.ts
export type Direction = 'forward' | 'backward' | 'left' | 'right' | 'stop';

export interface LedCommand {
  led: 'red' | 'green';
  state: boolean;
}

export interface TruckCommand {
  command: 'move' | 'pump' | 'led';
  value: Direction | boolean | LedCommand;
}

export interface ESP32Message {
  connected?: boolean;
  // Add other message fields as needed
}
