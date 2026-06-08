import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Management System';

  private authService = inject(AuthService);
  private router = inject(Router);

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get showNavbar(): boolean {

  const publicRoutes = [
    '/',
    '/login',
    '/register'
  ];

  return (
    this.isAuthenticated &&
    !publicRoutes.includes(this.router.url)
  );
}

  logout(): void {
    this.authService.logout();
  }
}