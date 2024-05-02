import { Component } from '@angular/core';
import { User } from '../../models/user';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-admin-table-user',
  templateUrl: './admin-table-user.component.html',
  styleUrl: './admin-table-user.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AdminTableUserComponent {
  users: User[] = [];
  value = '';
  userNumber: number = 0;

  public columns = [
    { field: 'id', header: 'Id' },
    { field: 'userName', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'action', header: 'Action' },
  ];

  constructor(
    private userService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAllUsers();
    this.getNumberOfUsers();
  }

  getNumberOfUsers() {
    this.userService.numberOfUsersService().subscribe((result) => {
      this.userNumber = result;
    });
  }

  clearFilter() {
    this.value = '';
    this.getAllUsers(this.value);
  }

  getAllUsers(searchTerm = '') {
    this.userService.getAllUserServices(searchTerm).subscribe((result) => {
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
        this.userService.deleteUserService(id).subscribe((result) => {
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