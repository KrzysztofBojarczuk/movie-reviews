import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'https://localhost:7068/api/Movie/';

  constructor(private http: HttpClient) {}

  getMovieServices(searchTerm: string = ''): Observable<Movie[]> {
    const params = { searchTerm: searchTerm };
    return this.http.get<Movie[]>(this.apiUrl, { params: params });
  }
}
