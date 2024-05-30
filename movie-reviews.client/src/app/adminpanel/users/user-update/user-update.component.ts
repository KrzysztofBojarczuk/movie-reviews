import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css',
})
export class UserUpdateComponent {
  user!: User;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.user = { ...this.config.data.userData };
  }
}
