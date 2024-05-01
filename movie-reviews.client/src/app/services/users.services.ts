import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://localhost:7068/api/Users/';

  constructor(private http: HttpClient) {}

  getAllUserServices(searchTerm?: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrl + `GetAllUsers?searchTerm=${searchTerm}`
    );
  }

  deleteUserService(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}${id}`);
  }

  numberOfUsersService(): Observable<number> {
    return this.http.get<number>(this.apiUrl + `UserNumber`);
  }
}
