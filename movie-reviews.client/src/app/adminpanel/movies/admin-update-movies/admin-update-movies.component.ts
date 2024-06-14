import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { MoviesService } from '../../../services/movies.service';
import { Category } from '../../../enums/category';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-admin-update-movies',
  templateUrl: './admin-update-movies.component.html',
  styleUrl: './admin-update-movies.component.css',
})
export class AdminUpdateMoviesComponent {
  movie!: Movie;
  movieForm: FormGroup;

  categories: { value: number; name: string }[] = [
    { value: Category.Scfi, name: 'Scfi' },
    { value: Category.Horror, name: 'Horror' },
    { value: Category.Action, name: 'Action' },
    { value: Category.Thriler, name: 'Thriler' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private movieServices: MoviesService,
    private config: DynamicDialogConfig
  ) {
    this.movieForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      releasetime: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.movie = { ...this.config.data.movieData };

    this.movieForm.patchValue({
      title: this.movie.title,
      category: this.movie.category,
      releasetime: new Date(this.movie.releasetime),
    });
  }

  submit(movie: Movie) {
    this.movieServices.updateMovieService(movie, this.movie.id).subscribe(
      () => {
        this.ref.close({ accepted: true });
      },
      (error) => {
        this.ref.close({ rejected: true });
      }
    );
  }
}
