import { Component } from '@angular/core';
import { AudioControlComponent } from '@features/fire-truck/components/controls/audio-control/audio-control.component';

@Component({
  selector: 'app-sound-config',
  standalone: true,
  imports: [AudioControlComponent],
  templateUrl: './sound-config.component.html',
  styleUrl: './sound-config.component.scss',
})
export class SoundConfigComponent {}
