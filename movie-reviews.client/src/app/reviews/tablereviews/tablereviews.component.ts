import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormreviewsComponent } from '../formreviews/formreviews.component';

@Component({
  selector: 'app-tablereviews',
  templateUrl: './tablereviews.component.html',
  styleUrl: './tablereviews.component.css',
})
export class TablereviewsComponent {
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  openFormModal() {
    const ref = this.dialogService.open(FormreviewsComponent, {
      header: 'AddReview',
      width: '70%',
    });
  }
}
