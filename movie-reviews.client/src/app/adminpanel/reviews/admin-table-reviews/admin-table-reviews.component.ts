import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminFormReviewsComponent } from '../admin-form-reviews/admin-form-reviews.component';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { SelectItem } from '../../../models/selectItem';
import { AdminUpdateReviewsComponent } from '../admin-update-reviews/admin-update-reviews.component';

@Component({
  selector: 'app-admin-table-reviews',
  templateUrl: './admin-table-reviews.component.html',
  styleUrl: './admin-table-reviews.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AdminTableReviewsComponent {
  ref: DynamicDialogRef | undefined;

  review: Review[] = [];
  value = '';
  numberOfReviews: number = 0;
  selectedSortOption: string = 'default';
  sortOptions: SelectItem[] = [
    { label: 'Highest Rating', value: 'rating_desc' },
    { label: 'Lowest Rating', value: 'rating_asc' },
    { label: 'Default', value: 'default' },
  ];

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
      header: 'Add Review',
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

  getReviews(searchTerm = '') {
    this.reviewService.getAlReviewsService(searchTerm).subscribe((result) => {
      this.review = result;
    });
  }

  clearFilter() {
    this.value = '';
    this.getReviews(this.value);
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

  updateReview(review: Review) {
    const ref = this.dialogService.open(AdminUpdateReviewsComponent, {
      header: 'Update User',
      width: '70%',
      data: {
        reviewData: review,
      },
    });

    ref.onClose.subscribe((result) => {
      if (result.accepted) {
        this.messageService.add({
          severity: 'success',
          summary: 'Review Updated',
          detail: `Review ${review.title} has been updated successfully.`,
        });
      } else if (result.rejected) {
        this.messageService.add({
          severity: 'error',
          summary: 'Update Cancelled',
          detail: `Review ${review.title}  update has been cancelled.`,
        });
      }
      this.getReviews();
    });
  }

  sortReviews() {
    this.reviewService
      .getAlReviewsService(this.value, (this.selectedSortOption as any).value)
      .subscribe((result) => {
        this.review = result;
      });
  }
}
