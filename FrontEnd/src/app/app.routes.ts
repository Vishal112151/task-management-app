import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing.component').then(m => m.LandingComponent)
  },
  // {
  //   path: '',
  //   loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  // },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadComponent: () => import('./tasks/task-list/task-list.component').then(m => m.TaskListComponent)
  },
  {
    path: 'tasks/create',
    canActivate: [AuthGuard],
    loadComponent: () => import('./tasks/task-create/task-create.component').then(m => m.TaskCreateComponent)
  },
  {
    path: 'tasks/edit/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./tasks/task-edit/task-edit.component').then(m => m.TaskEditComponent)
  },
  {
    path: 'tasks/:id',
    canActivate: [AuthGuard],
    loadComponent: () => import('./tasks/task-details/task-details.component').then(m => m.TaskDetailsComponent)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
