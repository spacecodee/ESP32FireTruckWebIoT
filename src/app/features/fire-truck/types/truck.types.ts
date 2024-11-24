// src/app/features/fire-truck/types/truck.types.ts
export type Direction = 'forward' | 'backward' | 'left' | 'right' | 'stop';

export interface MoveCommand {
  command: 'move';
  direction: Direction;
}

export interface PumpCommand {
  command: 'pump';
  state: boolean;
}

export interface LedCommand {
  command: 'led';
  led: 'red' | 'green';
  state: boolean;
}

export interface ServoCommand {
  command: 'servo';
}

export type WSCommand = MoveCommand | PumpCommand | LedCommand | ServoCommand;

export interface ESP32Message {
  connected?: boolean;
  // Add other message fields as needed
}

export interface ESP32Status {
  type: 'status';
  connected: boolean;
  leds: {
    red: boolean;
    green: boolean;
  };
}

export interface ServoStatus {
  type: 'servo_status';
  position: number;
}

export interface ConnectionMessage {
  type: 'connection';
  connected: boolean;
}

export type WSMessage = WSCommand | ESP32Status | ServoStatus;
