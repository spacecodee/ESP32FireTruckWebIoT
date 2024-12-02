import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService, SoundType } from '@core/services/audio.service';

@Component({
  selector: 'app-audio-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-control.component.html',
})
export class AudioControlComponent {
  soundEnabled = true;
  selectedSound: SoundType = 'alert1';
  sounds: SoundType[] = ['alert1', 'alert2', 'alert3'];
  isPlaying = false;

  constructor(private readonly audioService: AudioService) {}

  onSoundSelect(sound: SoundType): void {
    if (this.isPlaying) {
      this.audioService.resetPreview(this.selectedSound);
    }
    this.selectedSound = sound;
    this.audioService.selectSound(sound);
    this.isPlaying = false;
  }

  togglePreview(): void {
    if (this.isPlaying) {
      this.audioService.pausePreview(this.selectedSound);
    } else {
      this.audioService.playPreview(this.selectedSound);
    }
    this.isPlaying = !this.isPlaying;
  }

  resetPreview(): void {
    this.audioService.resetPreview(this.selectedSound);
    this.isPlaying = false;
  }

  toggleSound(): void {
    this.soundEnabled = !this.soundEnabled;
    this.audioService.toggleSound(this.soundEnabled);
  }
}
