import { Component } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../models/movie';
import { AdminFormMoviesComponent } from '../admin-form-movies/admin-form-movies.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-table-movies',
  templateUrl: './admin-table-movies.component.html',
  styleUrl: './admin-table-movies.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AdminTableMoviesComponent {
  movies: Movie[] = [];
  value = '';

  constructor(
    private dialogService: DialogService,
    private movieServices: MoviesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies(searchTerm = '') {
    this.movieServices.getMovieServices(searchTerm).subscribe((result) => {
      this.movies = result;
    });
  }

  clearFilter() {
    this.value = '';
    this.getMovies(this.value);
  }

  openFormModal() {
    const ref = this.dialogService.open(AdminFormMoviesComponent, {
      header: 'Add Movie',
      width: '30%',
      height: '50%',
    });

    ref.onClose.subscribe(() => {
      this.getMovies();
    });
  }

  deleteMovie(id: number) {
    console.log(
      '%csrcappadminpanelmoviesadmin-table-moviesadmin-table-movies.component.ts:53 id',
      'color: #007acc;',
      id
    );
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
