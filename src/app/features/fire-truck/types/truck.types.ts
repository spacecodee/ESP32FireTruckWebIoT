// src/app/features/fire-truck/types/truck.types.ts
export type Direction = 'forward' | 'backward' | 'left' | 'right' | 'stop';

export interface TruckCommand {
  command: 'move' | 'pump';
  value: Direction | boolean;
}

export interface ESP32Message {
  connected?: boolean;
  // Add other message fields as needed
}
