import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { AuthResponse } from '../../auth/models/auth-response.model';
import { Credentials } from '../../auth/models/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = environment.jwtTokenKey;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(response => this.storeToken(response.token))
    );
  }

  register(credentials: Credentials): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.apiUrl}/auth/register`, credentials);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getProfile(): Observable<{ userId: string; name: string; email: string; role: string }> {
    return this.http.get<{ userId: string; name: string; email: string; role: string }>(`${environment.apiUrl}/auth/profile`);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}
