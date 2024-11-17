// view/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementPadComponent } from '../../../features/fire-truck/components/controls/movement-pad/movement-pad.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MovementPadComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
