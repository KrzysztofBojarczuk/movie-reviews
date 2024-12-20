import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://localhost:7068/api/Users/';

  constructor(private http: HttpClient) {}

  getAllUserAdminServices(searchTerm: string = ''): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrl + `GetAllUsersAdmin?searchTerm=${searchTerm}`
    );
  }

  getAllUserServices(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + `GetAllUsers`);
  }

  deleteUserService(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}${id}`);
  }

  numberOfUsersService(): Observable<number> {
    return this.http.get<number>(this.apiUrl + `UserNumber`);
  }

  sendEmailsService(selectedUsers: User[]): Observable<string[]> {
    const userIds = selectedUsers.map((user) => user.id);
    const params = userIds.map((userId) => `userId=${userId}`).join('&');

    return this.http.get<string[]>(`${this.apiUrl}UserEmails?${params}`);
  }

  updateUserService(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}${id}`, user);
  }
}
