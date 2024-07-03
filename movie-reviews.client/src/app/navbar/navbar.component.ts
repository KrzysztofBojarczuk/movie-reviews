import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[] = [];
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.isLoggedIn$.subscribe((isLoggedIn) => {
      this.items = [
        {
          label: 'Users',
          routerLink: '/users',
          visible: isLoggedIn,
        },
        {
          label: 'Reviews',
          routerLink: '/reviews',
          visible: isLoggedIn,
        },
        {
          label: 'Movies',
          routerLink: '/movies',
          visible: isLoggedIn,
        },
        {
          label: isLoggedIn ? 'Logout' : 'Login',
          routerLink: isLoggedIn ? '/logout' : '/login',
          icon: isLoggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in',
          command: isLoggedIn ? () => this.logout() : undefined,
          visible: true,
        },
      ];
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
