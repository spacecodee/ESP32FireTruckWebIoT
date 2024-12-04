import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService, SoundType } from '@core/services/audio.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from '@app/core/services/websocket/websocket.service';

@Component({
  selector: 'app-audio-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-control.component.html',
})
export class AudioControlComponent implements OnInit, OnDestroy {
  soundEnabled = true;
  selectedSound: SoundType = 'alert1';
  sounds: SoundType[] = ['alert1', 'alert2', 'alert3'];
  isPlaying = false;
  private subscription?: Subscription;

  constructor(
    private readonly audioService: AudioService,
    private readonly webSocketService: WebSocketService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.webSocketService.connectionStatus$.subscribe(
      (connected) => {
        if (!connected) {
          // Reset audio state when disconnected
          this.isPlaying = false;
          this.audioService.resetPreview(this.selectedSound);
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    // Ensure audio is stopped when component is destroyed
    this.audioService.resetPreview(this.selectedSound);
  }

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
