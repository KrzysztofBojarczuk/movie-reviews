import { Component } from '@angular/core';
import { Category } from '../../enums/category';
import { DialogService } from 'primeng/dynamicdialog';
import { SpectatorService } from '../../services/spectator.service';
import { Movie } from '../../models/movie';
import { forkJoin, Observable, tap } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Review } from '../../models/review';

@Component({
  selector: 'app-spectator',
  templateUrl: './spectator.component.html',
  styleUrl: './spectator.component.css',
  providers: [ConfirmationService, MessageService],
})
export class SpectatorComponent {
  movies: Movie[] = [];
  movieReviews: Review[] = [];
  value = '';
  selectedMovieId: number = 0;
  numberOfMoviesReviews: number = 0;
  numberOfReviewsMap: { [key: number]: number } = {};
  startDatepicker: Date | null = null;
  endDatepicker: Date | null = null;

  costOfReviews: number = 0;
  averageRating: number = 0;

  enumCategory: any[] = [
    { name: 'Sci-fi', value: Category.Scfi },
    { name: 'Horror', value: Category.Horror },
    { name: 'Action', value: Category.Action },
    { name: 'Thriller', value: Category.Thriler },
  ];

  isSelectButtonOptionSelected: boolean = false;
  valueSelectButton: number[] = [];

  constructor(
    private dialogService: DialogService,
    private spectatorService: SpectatorService
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  onSelectChange(event: any) {
    this.valueSelectButton = event.value;
    this.isSelectButtonOptionSelected = this.valueSelectButton.length > 0;
    this.getMovies('', '', '', this.valueSelectButton);
  }

  getMovies(
    searchTerm = '',
    startDatepicker = '',
    endDatepicker = '',
    selectedValues?: number[]
  ) {
    this.spectatorService
      .getMovieServices(
        searchTerm,
        startDatepicker,
        endDatepicker,
        selectedValues
      )
      .subscribe((result) => {
        this.movies = result;

        const reviewsObservables = this.movies.map((movie) =>
          this.getNumberReviews(movie.id).pipe(
            tap((reviews) => {
              this.numberOfReviewsMap[movie.id] = reviews;
            })
          )
        );

        forkJoin(reviewsObservables).subscribe(() => {
          if (this.selectedMovieId !== 0) {
            this.loadReviewsAndStats(this.selectedMovieId);
          }
        });
      });
  }

  getMoviesDate() {
    const startDate = this.startDatepicker
      ? this.startDatepicker.toISOString().split('T')[0]
      : undefined;
    const endDate = this.endDatepicker
      ? this.endDatepicker.toISOString().split('T')[0]
      : undefined;
    this.getMovies(this.value, startDate, endDate);
  }

  clearFilter() {
    this.value = '';
    this.getMovies(this.value);
  }

  clearDates() {
    this.startDatepicker = null;
    this.endDatepicker = null;
    this.getMovies(this.value);
  }

  getNumberReviews(id: number) {
    return this.spectatorService.getNumberOfReviewsForMoviesByIdService(id);
  }

  getCategoryName(category: number): string {
    return Category[category];
  }

  openReviews(id: number) {
    this.selectedMovieId = id;
    this.loadReviewsAndStats(id);
  }

  loadReviewsAndStats(movieId: number) {
    this.getReviewsMovie(movieId);
    this.getCostOfReviews(movieId);
    this.getAverageRating(movieId);
  }

  getReviewsMovie(movieId: number) {
    this.spectatorService
      .getGetReviewsByMovieIdService(movieId)
      .subscribe((result) => {
        this.movieReviews = result;
      });
  }

  getCostOfReviews(movieId: number) {
    this.spectatorService
      .getCosteOfReviewsForMovieByIdService(movieId)
      .subscribe((result) => {
        this.costOfReviews = result;
      });
  }

  getAverageRating(movieId: number) {
    this.spectatorService
      .getAverageOfRatingForMovieByIdService(movieId)
      .subscribe((result) => {
        this.averageRating = result;
      });
  }
}
