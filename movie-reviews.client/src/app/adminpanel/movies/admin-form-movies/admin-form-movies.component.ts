import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../../../models/movie';
import { MoviesService } from '../../../services/movies.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-form-movies',
  templateUrl: './admin-form-movies.component.html',
  styleUrl: './admin-form-movies.component.css',
})
export class AdminFormMoviesComponent {
  movieForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movieServices: MoviesService,
    private ref: DynamicDialogRef
  ) {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      releasetime: ['', Validators.required],
    });
  }

  submit(movie: Movie) {
    this.movieServices.createMovieService(movie).subscribe(() => {
      this.ref.close();
    });
  }
}
