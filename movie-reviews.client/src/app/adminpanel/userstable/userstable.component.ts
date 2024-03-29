import { Component } from '@angular/core';
import { UsersService } from '../../services/users.services';
import { User } from '../../models/user';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'app-userstable',
  templateUrl: './userstable.component.html',
  styleUrl: './userstable.component.css',
  providers: [ConfirmationService, MessageService],
})
export class UserstableComponent {
  users: User[] = [];

  public columns = [
    { field: 'id', header: 'Id' },
    { field: 'userName', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'action', header: 'Action' },
  ];

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getAllUserServices().subscribe((result) => {
      console.log('color: #007acc;', result);
      this.users = result;
    });
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this User?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',

      accept: () => {
        this.usersService.deleteUserService(id).subscribe((result) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'User deleted successfully',
          });
          this.getAllUsers();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Deletion Cancelled',
          detail: 'The operation was cancelled',
          life: 3000,
        });
      },
    });
  }
}
