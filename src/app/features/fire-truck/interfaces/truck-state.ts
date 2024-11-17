// features/fire-truck/interfaces/truck-state.ts
export interface TruckState {
  waterLevel: number;
  batteryLevel: number;
  isConnected: boolean;
  speed: number;
  direction: 'forward' | 'backward' | 'left' | 'right' | 'stop';
}
