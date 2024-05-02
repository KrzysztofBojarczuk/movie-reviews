import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminFormReviewsComponent } from '../admin-form-reviews/admin-form-reviews.component';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'app-admin-table-reviews',
  templateUrl: './admin-table-reviews.component.html',
  styleUrl: './admin-table-reviews.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AdminTableReviewsComponent {
  ref: DynamicDialogRef | undefined;

  review: Review[] = [];
  numberOfReviews: number = 0;

  constructor(
    private dialogService: DialogService,
    private reviewService: ReviewService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getReviews();
    this.getNumberOfReviews();
  }

  openFormModal() {
    const ref = this.dialogService.open(AdminFormReviewsComponent, {
      header: 'AddReview',
      width: '70%',
    });

    ref.onClose.subscribe(() => {
      this.getReviews();
      this.getNumberOfReviews();
    });
  }

  getNumberOfReviews() {
    this.reviewService.getNumberOfReviewsService().subscribe((result) => {
      this.numberOfReviews = result;
    });
  }

  getReviews() {
    this.reviewService.getAlReviewsService().subscribe((result) => {
      this.review = result;
    });
  }

  deleteReview(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Review?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',

      accept: () => {
        this.reviewService.deleteReviewService(id).subscribe((result) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Review deleted successfully',
          });
          this.getReviews();
          this.getNumberOfReviews();
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