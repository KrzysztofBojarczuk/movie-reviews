import { Component, Input, SimpleChanges } from '@angular/core';
import { ReviewService } from '../../../services/review.service';
import { Review } from '../../../models/review';

@Component({
  selector: 'app-admin-movie-reviews',
  templateUrl: './admin-movie-reviews.component.html',
  styleUrl: './admin-movie-reviews.component.css',
})
export class AdminMovieReviewsComponent {
  @Input() movieId: number = 0;
  movieReviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.getReviewsMovie(this.movieId);
  }

  getReviewsMovie(movieId: number) {
    this.reviewService
      .getGetReviewsByMovieIdService(movieId)
      .subscribe((result) => {
        this.movieReviews = result;
      });
  }
}
