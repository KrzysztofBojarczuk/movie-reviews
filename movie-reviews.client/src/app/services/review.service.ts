import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../models/review';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'https://localhost:7068/api/';

  constructor(private http: HttpClient) {}

  getAlReviewsService(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl + 'Review');
  }

  createReviewService(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl + 'Review/Post', review);
  }

  deleteReviewService(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}Review/Delete/${id}`);
  }
}
