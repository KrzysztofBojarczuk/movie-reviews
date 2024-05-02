import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin-form-reviews',
  templateUrl: './admin-form-reviews.component.html',
  styleUrl: './admin-form-reviews.component.css',
})
export class AdminFormReviewsComponent {
  reviewForm: FormGroup;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private usersService: UsersService
  ) {
    this.reviewForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      rating: ['', Validators.required],
      appUserId: ['', Validators.required],
      userName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
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
}
