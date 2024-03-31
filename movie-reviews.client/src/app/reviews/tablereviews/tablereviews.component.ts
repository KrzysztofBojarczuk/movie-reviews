import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormreviewsComponent } from '../formreviews/formreviews.component';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-tablereviews',
  templateUrl: './tablereviews.component.html',
  styleUrl: './tablereviews.component.css',
})
export class TablereviewsComponent {
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
    const ref = this.dialogService.open(FormreviewsComponent, {
      header: 'AddReview',
      width: '70%',
    });
  }

  getReviews() {
    this.reviewService.getAlReviews().subscribe((result) => {
      this.review = result;
    });
  }
}
