import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) {}

  getAllUserServices(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'Users/GetAllUsers');
  }

  deleteUserService(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}Users/Delete/${id}`);
  }
}
