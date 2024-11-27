import { Routes } from '@angular/router';
import { DashboardComponent } from './view/pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './view/pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
