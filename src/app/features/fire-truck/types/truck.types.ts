// src/app/features/fire-truck/types/truck.types.ts
export type Direction =
  | 'forward'
  | 'backward'
  | 'left'
  | 'right'
  | 'stop'
  | 'forward_left'
  | 'forward_right'
  | 'backward_left'
  | 'backward_right';

export interface MoveCommand {
  command: 'motor';
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

// Add new interface for LED status
export interface LedStatus {
  type: 'status';
  led_red: boolean;
  led_green: boolean;
}

export interface ServoStatus {
  type: 'servo_status';
  position: number;
}

export interface ConnectionMessage {
  type: 'connection';
  connected: boolean;
}

export interface PumpStatus {
  type: 'status';
  pump: boolean;
}

export interface FlameSensorStatus {
  type: 'flame_sensors';
  sensor1: number;
  sensor2: number;
  sensor3: number;
}

export interface FireAnalytics {
  day: number;
  week: number;
  month: number;
  history: {
    date: string;
    sensor: number;
    value: number;
  }[];
  lastDetection: Date | null;
}

// Update WSMessage type
export type WSMessage =
  | WSCommand
  | LedStatus
  | ConnectionMessage
  | ServoStatus
  | PumpStatus
  | FlameSensorStatus;
