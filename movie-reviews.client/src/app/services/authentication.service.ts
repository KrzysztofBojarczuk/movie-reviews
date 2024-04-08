import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7068/';
  constructor(private http: HttpClient) {}

  registerUserService(registerUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'register', registerUser);
  }

  loginUserService(loginUser: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', loginUser);
  }
}
