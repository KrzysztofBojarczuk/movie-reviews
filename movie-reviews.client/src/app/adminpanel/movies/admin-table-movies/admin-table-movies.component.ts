import { Component } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../models/movie';
import { AdminFormMoviesComponent } from '../admin-form-movies/admin-form-movies.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from '../../../enums/category';
import { ReviewService } from '../../../services/review.service';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-admin-table-movies',
  templateUrl: './admin-table-movies.component.html',
  styleUrl: './admin-table-movies.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AdminTableMoviesComponent {
  movies: Movie[] = [];
  value = '';
  selectedMovieId: number = 0;
  numberOfMoviesReviews: number = 0;
  numberOfReviewsMap: { [key: number]: number } = {};

  enumCategory: any[] = [
    { name: 'Sci-fi', value: Category.Scfi },
    { name: 'Horror', value: Category.Horror },
    { name: 'Action', value: Category.Action },
    { name: 'Thriler', value: Category.Thriler },
  ];

  valueSelectButton: number[] = [];

  constructor(
    private dialogService: DialogService,
    private movieServices: MoviesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  onSelectChange(event: any) {
    this.valueSelectButton = event.value;
    this.getMovies('', this.valueSelectButton);
  }

  getMovies(searchTerm = '', selectedValues?: number[]) {
    this.movieServices
      .getMovieServices(searchTerm, selectedValues)
      .subscribe((result) => {
        this.movies = result;

        const reviewsObservables = this.movies.map((movie) =>
          this.getNumberReviews(movie.id).pipe(
            tap((reviews) => {
              this.numberOfReviewsMap[movie.id] = reviews;
            })
          )
        );
        //pipe służy do przetwarzania wartości zwracanych przez getNumberReviewsForMoviesByIdService.
        //tap wykonujemy operacje poboczne, w tym przypadku zapisujemy liczbę recenzji dla danego numberOfReviewsMap.
        //forkJoin oczekuje na zakończenie wszystkich zapytań
        forkJoin(reviewsObservables).subscribe();
      });
  }

  clearFilter() {
    this.value = '';
    this.getMovies(this.value);
  }

  openFormModal() {
    const ref = this.dialogService.open(AdminFormMoviesComponent, {
      header: 'Add Movie',
      width: '50%',
      height: '50%',
    });

    ref.onClose.subscribe(() => {
      this.getMovies();
    });
  }
  getNumberReviews(id: number) {
    return this.reviewService.getNumberOfReviewsForMoviesByIdService(id);
  }

  openReviews(id: number) {
    this.selectedMovieId = id;
  }

  getCategoryName(category: number): string {
    return Category[category];
  }

  deleteMovie(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Movie?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',

      accept: () => {
        this.movieServices.deleteMovieService(id).subscribe((result) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Movie deleted successfully',
          });
          this.getMovies();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Deletion Cancelled',
          detail: 'The operation was cancelled',
          life: 3000,
        });
      },
    });
  }
}