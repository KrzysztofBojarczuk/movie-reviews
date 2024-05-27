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

  costOfReviews: number = 0;
  costOfReviewsTS: number = 0;
  averageRating: number = 0;

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.getReviewsMovie(this.movieId);
    this.getCostOfReviews(this.movieId);
    this.getAverageRating(this.movieId);
  }

  getReviewsMovie(movieId: number) {
    this.reviewService
      .getGetReviewsByMovieIdService(movieId)
      .subscribe((result) => {
        this.movieReviews = result;

        this.costOfReviewsTS = this.movieReviews.reduce(
          (acc, review) => acc + review.costOfReview,
          0
        );
      });
  }

  getCostOfReviews(movieId: number) {
    this.reviewService
      .getCosteOfReviewsForMovieByIdService(movieId)
      .subscribe((result) => {
        this.costOfReviews = result;
      });
  }

  getAverageRating(movieId: number) {
    this.reviewService
      .getAverageOfRatingForMovieByIdService(movieId)
      .subscribe((result) => {
        this.averageRating = result;
      });
  }
}
