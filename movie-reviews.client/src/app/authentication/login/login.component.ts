import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
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

  ngOnInit(): void {
    this.isLoggedIn();
  }

  onSubmit(loginData: any) {
    this.authService.login(loginData).subscribe({
      next: () => {
        this.router.navigate(['Spectator']);
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
  moveToSignUp() {
    this.router.navigate(['register']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
