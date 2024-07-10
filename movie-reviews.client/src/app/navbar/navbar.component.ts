import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[] = [];
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Users',
        routerLink: '/users',
      },
      {
        label: 'Reviews',
        routerLink: '/reviews',
      },
      {
        label: 'Movies',
        routerLink: '/movies',
      },
      {
        label: 'Logout',
        routerLink: '/login',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
