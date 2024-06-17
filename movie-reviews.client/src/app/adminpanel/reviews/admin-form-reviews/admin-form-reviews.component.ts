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

    this.reviewForm.valueChanges.subscribe(() => {
      const numberOfHours = this.reviewForm.get('numberOfHours')?.value || 0;
      const rate = this.reviewForm.get('rate')?.value || 0;
      this.calculateCostOfReview(numberOfHours, rate);
    });
  }

  calculateCostOfReview(numberOfHours: number, rate: number) {
    const costOfReview = numberOfHours * rate;
    this.reviewForm.get('costOfReview')?.setValue(costOfReview);
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
