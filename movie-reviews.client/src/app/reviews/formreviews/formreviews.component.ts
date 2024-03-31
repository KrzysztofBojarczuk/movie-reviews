import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-formreviews',
  templateUrl: './formreviews.component.html',
  styleUrl: './formreviews.component.css',
})
export class FormreviewsComponent {
  reviewForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.reviewForm = this.formBuilder.group({
      title: ['', Validators.required],
      country: ['', Validators.required],
      Rating: ['', Validators.required],
    });
  }
}
