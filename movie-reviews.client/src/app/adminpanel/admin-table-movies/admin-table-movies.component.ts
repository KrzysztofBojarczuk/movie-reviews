import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-admin-table-movies',
  templateUrl: './admin-table-movies.component.html',
  styleUrl: './admin-table-movies.component.css',
})
export class AdminTableMoviesComponent {
  movies: Movie[] = [];
  value = '';
  constructor(private movieServices: MoviesService) {}

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
}
