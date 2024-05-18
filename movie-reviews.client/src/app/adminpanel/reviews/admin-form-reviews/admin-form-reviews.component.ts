import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../models/movie';
import { combineLatest, map, of } from 'rxjs';

@Component({
  selector: 'app-admin-form-reviews',
  templateUrl: './admin-form-reviews.component.html',
  styleUrl: './admin-form-reviews.component.css',
})
export class AdminFormReviewsComponent {
  reviewForm: FormGroup;
  users: User[] = [];
  movies: Movie[] = [];
  // selectedMovieId: number;
  selectedMovieId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private usersService: UsersService,
    private movieServices: MoviesService
  ) {
    this.reviewForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      rating: [
        '',
        [
          Validators.minLength(0),
          Validators.maxLength(10),
          Validators.required,
        ],
      ],
      appUserId: ['', Validators.required],
      userName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      movieId: ['', Validators.required],
      numberOfHours: [0, Validators.required],
      rate: [0, Validators.required],
      costOfReview: [0, { disabled: true }],
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllMovies();

    //combineLatest łączy obserwowalne strumienie
    //pipe to metoda używana w strumieniach RxJS do łączenia wielu operatoró
    //map to operator, który przetwarza wartości emitowane przez strumień i zwraca przetworzone wartości. Jest to sposób na przekształcenie jednej wartości w inną.
    combineLatest([
      this.reviewForm.get('numberOfHours')?.valueChanges || of(0), // Provide a default value if undefined
      this.reviewForm.get('rate')?.valueChanges || of(0), // Provide a default value if undefined
    ])
      .pipe(map(([numberOfHours, rate]) => numberOfHours * rate))
      .subscribe((tot) => this.reviewForm.get('costOfReview')?.setValue(tot));
  }

  submit(review: Review) {
    this.reviewService.createReviewService(review).subscribe(() => {
      this.ref.close();
    });
  }

  onReviewIdChange(event: Event) {
    const selectedUserId = (event.target as HTMLSelectElement).value;
    const selectedUser = this.users.find((user) => user.id === selectedUserId);

    if (selectedUser) {
      this.reviewForm.patchValue({
        userName: selectedUser.userName,
        email: selectedUser.email,
      });
    }
  }

  getAllUsers() {
    this.usersService.getAllUserServices().subscribe((result) => {
      this.users = result;
    });
  }

  getAllMovies() {
    this.movieServices.getMovieServices().subscribe((result) => {
      this.movies = result;
    });
  }
}
