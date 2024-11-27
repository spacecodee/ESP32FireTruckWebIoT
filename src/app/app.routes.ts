import { Routes } from '@angular/router';
import { DashboardComponent } from './view/pages/dashboard/dashboard.component';
import { LoginComponent } from './view/pages/login/login.component';
import { ConfigComponent } from './view/pages/config/config.component';
import { authGuard } from '@core/guards/auth.guard';

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
  },
];
