import { Injectable } from '@angular/core';

export type SoundType = 'alert1' | 'alert2' | 'alert3';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private readonly sounds: Record<SoundType, HTMLAudioElement> = {
    alert1: new Audio('/assets/audio/alert1.mp3'),
    alert2: new Audio('/assets/audio/alert2.mp3'),
    alert3: new Audio('/assets/audio/alert3.mp3'),
  };

  private selectedSound: SoundType = 'alert1';
  private isEnabled = true;

  selectSound(type: SoundType): void {
    this.selectedSound = type;
  }

  toggleSound(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  playAlert(): void {
    if (this.isEnabled) {
      this.sounds[this.selectedSound].play().then((r) => console.log("playAlert", r));
    }
  }

  playPreview(type: SoundType): void {
    this.sounds[type].play().then((r) => console.log("playPreview", r));
  }

  pausePreview(type: SoundType): void {
    this.sounds[type].pause();
  }

  resetPreview(type: SoundType): void {
    this.sounds[type].pause();
    this.sounds[type].currentTime = 0;
  }

  constructor() {}
}
