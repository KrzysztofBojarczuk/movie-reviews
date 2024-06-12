import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { MoviesService } from '../../../services/movies.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ReviewService } from '../../../services/review.service';
import { Review } from '../../../models/review';
import { User } from '../../../models/user';
import { Movie } from '../../../models/movie';
import { ConfirmationService } from 'primeng/api/confirmationservice';
import { MessageService } from 'primeng/api';
import { combineLatest, map, of } from 'rxjs';

@Component({
  selector: 'app-admin-update-reviews',
  templateUrl: './admin-update-reviews.component.html',
  styleUrl: './admin-update-reviews.component.css',
})
export class AdminUpdateReviewsComponent {
  review!: Review;
  reviewForm: FormGroup;
  users: User[] = [];
  movies: Movie[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private usersService: UsersService,
    private movieServices: MoviesService,
    private config: DynamicDialogConfig
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

    combineLatest([
      this.reviewForm.get('numberOfHours')?.valueChanges || of(0),
      this.reviewForm.get('rate')?.valueChanges || of(0),
    ])
      .pipe(map(([numberOfHours, rate]) => numberOfHours * rate))
      .subscribe((tot) => this.reviewForm.get('costOfReview')?.setValue(tot));

    this.review = { ...this.config.data.reviewData };

    this.reviewForm.patchValue({
      title: this.review.title,
      text: this.review.text,
      rating: this.review.rating,
      movieId: this.review.movieId,
      appUserId: this.review.appUserId,
      numberOfHours: this.review.numberOfHours,
      rate: this.review.rate,
      costOfReview: this.review.costOfReview,
    });
  }

  submit(review: Review) {
    this.reviewService.updateReviewService(review, this.review.id).subscribe(
      () => {
        this.ref.close({ accepted: true });
      },
      (error) => {
        this.ref.close({ rejected: true });
      }
    );
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
