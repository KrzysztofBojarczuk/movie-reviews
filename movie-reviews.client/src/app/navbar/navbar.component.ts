import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      { label: 'Users', routerLink: 'users' },
      { label: 'Reviews', routerLink: 'reviews' },
    ];
  }
}
