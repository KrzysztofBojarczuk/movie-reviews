import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { RegisterRequest } from '../models/register-request';
import { flush } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7068/';

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasAccessToken());
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  registerUserService(
    registerUser: RegisterRequest
  ): Observable<RegisterRequest> {
    return this.httpClient.post<RegisterRequest>(
      this.apiUrl + 'register',
      registerUser
    );
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(this.apiUrl + 'login', credentials)
      .pipe(
        map((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          document.cookie = `refreshToken=${response.refreshToken};`;
          this.loggedInSubject.next(true);
          return response;
        })
      );
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshTokenFromCookie();

    return this.httpClient
      .post<LoginResponse>(this.apiUrl + 'refresh', { refreshToken })
      .pipe(
        map((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          document.cookie = `refreshToken=${response.refreshToken};`;
          return response;
        })
      );
  }

  private getRefreshTokenFromCookie(): string | null {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split('; ');

    for (const cookie of cookieArray) {
      const [name, value] = cookie.split('=');
      if (name == 'refreshToken') {
        return value;
      }
    }

    return null;
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    if (localStorage.getItem('accessToken') === null) {
      return of(false);
    }

    return this.httpClient.get(this.apiUrl + 'validate-access-token').pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  private hasAccessToken(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }
}
