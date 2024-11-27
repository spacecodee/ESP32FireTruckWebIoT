import { Routes } from '@angular/router';
import { DashboardComponent } from './view/pages/dashboard/dashboard.component';
import { LoginComponent } from './view/pages/login/login.component';
import { ConfigComponent } from './view/pages/config/config.component';
import { authGuard } from '@core/guards/auth.guard';
import { SensorPanelComponent } from './view/pages/dashboard/pages/sensor-panel/sensor-panel.component';
import { SoundConfigComponent } from './view/pages/dashboard/pages/sound-config/sound-config.component';
import { TruckControlComponent } from './view/pages/dashboard/pages/truck-control/truck-control.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'config',
    component: ConfigComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'sensors', pathMatch: 'full' },
      { path: 'sensors', component: SensorPanelComponent },
      { path: 'sound', component: SoundConfigComponent },
      { path: 'control', component: TruckControlComponent },
    ],
  },
];
