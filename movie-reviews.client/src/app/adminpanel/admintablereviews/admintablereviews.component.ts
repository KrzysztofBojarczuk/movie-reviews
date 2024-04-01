import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminformreviewsComponent } from '../adminformreviews/adminformreviews.component';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-admintablereviews',
  templateUrl: './admintablereviews.component.html',
  styleUrl: './admintablereviews.component.css',
})
export class AdmintablereviewsComponent {
  ref: DynamicDialogRef | undefined;

  review: Review[] = [];

  constructor(
    private dialogService: DialogService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.getReviews();
  }

  openFormModal() {
    const ref = this.dialogService.open(AdminformreviewsComponent, {
      header: 'AddReview',
      width: '70%',
    });
  }

  getReviews() {
    this.reviewService.getAlReviewsService().subscribe((result) => {
      this.review = result;
    });
  }
}
