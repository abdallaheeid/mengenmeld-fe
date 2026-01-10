import { inject, Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private httpClient = inject(HttpClient);

  ngOnInit(): void {}

  login(username: string, password: string) {
    return this.httpClient
      .post<{ token: string }>(`${this.API_URL}/login`, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    const token = this.getToken();

    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub ?? null;
    } catch {
      return null;
    }
  }
}
