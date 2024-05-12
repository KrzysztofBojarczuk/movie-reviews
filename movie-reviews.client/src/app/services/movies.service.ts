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

  createMovieService(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  deleteMovieService(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}${id}`);
  }
}
