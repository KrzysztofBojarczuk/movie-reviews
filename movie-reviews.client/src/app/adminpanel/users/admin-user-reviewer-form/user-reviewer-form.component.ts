import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/register-request';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-reviewer-form',
  templateUrl: './user-reviewer-form.component.html',
  styleUrl: './user-reviewer-form.component.css',
})
export class UserReviewerFormComponent {
  registerForm: FormGroup;
  duplicateError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ref: DynamicDialogRef
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/
          ),
          Validators.minLength(6),
        ],
      ],
    });
  }

  onSubmit(register: RegisterRequest) {
    console.log(register);
    this.duplicateError = false;

    this.authService
      .registerUserReviewerService(register)
      .pipe(
        catchError((error) => {
          if (error.error.errors?.DuplicateUserName) {
            this.duplicateError = true;
          }
          return throwError(() => error);
        })
      )
      .subscribe({
        next: () => {
          this.ref.close({ accepted: true });
        },
        error: (err) => {
          console.error(err);
          this.ref.close({ rejected: true });
        },
      });
  }
}
