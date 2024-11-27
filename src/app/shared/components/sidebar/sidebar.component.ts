import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  menuItems = [
    { icon: 'fa-chart-line', label: 'Sensors', route: '/dashboard/sensors' },
    { icon: 'fa-volume-up', label: 'Sound Config', route: '/dashboard/sound' },
    { icon: 'fa-truck', label: 'Truck Control', route: '/dashboard/control' },
  ];
}
