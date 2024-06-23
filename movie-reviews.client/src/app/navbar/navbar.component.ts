import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[];

  constructor(private authService: AuthService) {
    this.items = [
      { label: 'Users', routerLink: '/users', visible: this.isLoggedIn() },
      { label: 'Reviews', routerLink: '/reviews', visible: this.isLoggedIn() },
      { label: 'Movies', routerLink: '/movies', visible: this.isLoggedIn() },
      // {
      //   label: '',
      //   icon: 'pi pi-sign-in',
      //   routerLink: 'login',
      //   title: 'Login',
      //   visible: !this.isLoggedIn(),
      // },
      {
        label: '',
        routerLink: '/login',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
        title: 'Logout',
        visible: this.isLoggedIn(),
      },
    ];
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
