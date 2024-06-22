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

  // ngOnInit(): void {
  //   this.isLoggedIn();
  // }

  onSubmit(login: LoginRequest) {
    this.authService.login(login).subscribe(() => {
      console.log('Login successful');
      this.router.navigate(['']);
    });
  }

  moveToSignUp() {
    this.router.navigate(['register']);
  }

  // isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }
}
