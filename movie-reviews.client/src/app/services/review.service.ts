import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://localhost:7068/api/Review/';

  constructor(private http: HttpClient) {}

  getAlReviewsService(
    searchTerm: string = '',
    sortOrder: string = ''
  ): Observable<Review[]> {
    const params = { searchTerm: searchTerm, sortOrder: sortOrder };
    return this.http.get<Review[]>(`${this.apiUrl}`, { params: params });
  }

  createReviewService(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  deleteReviewService(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}${id}`);
  }

  getNumberOfReviewsByIdService(id: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}CountReviewsByUserId/${id}`);
  }

  getNumberOfReviewsService(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}GetNumberOfReviews`);
  }

  getGetReviewsByMovieIdService(id: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}GetReviewsByMovieId/${id}`);
  }
}
