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

  getMovieServices(
    searchTerm: string = '',
    startDatepicker: string = '',
    endDatepicker: string = '',
    selectedValues?: number[]
  ): Observable<Movie[]> {
    let url = `${this.apiUrl}?searchTerm=${searchTerm}&startDatepicker=${startDatepicker}&endDatepicker=${endDatepicker}`;

    if (selectedValues && selectedValues.length > 0) {
      url += `&${selectedValues
        .map((category) => `enumCategory=${category}`)
        .join('&')}`;
    }

    return this.http.get<Movie[]>(url);
  }

  createMovieService(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovieService(movie: Movie, id: number): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}${id}`, movie);
  }

  deleteMovieService(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}${id}`);
  }
}
