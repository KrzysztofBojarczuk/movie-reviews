import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class SpectatorService {
  private apiUrl = 'https://localhost:7068/api/Spectator/';

  constructor(private http: HttpClient) {}

  getMovieServices(
    searchTerm: string = '',
    startDatepicker: string = '',
    endDatepicker: string = '',
    selectedValues?: number[]
  ): Observable<Movie[]> {
    let url = `${this.apiUrl}Movies/?searchTerm=${searchTerm}&startDatepicker=${startDatepicker}&endDatepicker=${endDatepicker}`;

    if (selectedValues && selectedValues.length > 0) {
      url += `&${selectedValues
        .map((category) => `enumCategory=${category}`)
        .join('&')}`;
    }

    return this.http.get<Movie[]>(url);
  }

  getNumberOfReviewsForMoviesByIdService(id: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}CountReviewsForMovieById/${id}`
    );
  }

  getNumberOfReviewsService(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}GetNumberOfReviews`);
  }

  getNumberOfReviewsByIdService(id: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}CountReviewsByUserId/${id}`);
  }

  getGetReviewsByMovieIdService(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}GetReviewsByMovieId/${id}`);
  }

  getCosteOfReviewsForMovieByIdService(id: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}GetCosteOfReviewsForMovieById/${id}`
    );
  }

  getAverageOfRatingForMovieByIdService(id: number): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}GetAverageOfRatingForMovieById/${id}`
    );
  }
}
