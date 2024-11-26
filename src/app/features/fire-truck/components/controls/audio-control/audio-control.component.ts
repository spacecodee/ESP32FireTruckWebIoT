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

  constructor(private audioService: AudioService) {}

  onSoundSelect(sound: SoundType): void {
    this.selectedSound = sound;
    this.audioService.selectSound(sound);
  }

  toggleSound(): void {
    this.soundEnabled = !this.soundEnabled;
    this.audioService.toggleSound(this.soundEnabled);
  }
}
