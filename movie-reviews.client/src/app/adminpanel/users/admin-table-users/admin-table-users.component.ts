import { Component } from '@angular/core';
import { User } from '../../../models/user';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-admin-table-users',
  templateUrl: './admin-table-users.component.html',
  styleUrl: './admin-table-users.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AdminTableUsersComponent {
  users: User[] = [];
  value = '';
  userNumber: number = 0;
  selectedUsers: User[] = [];

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

  toggleUserSelection(user: User) {
    const index = this.selectedUsers.findIndex(
      (selectedUser) => selectedUser.id === user.id
    );
    if (index !== -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(user);
    }
  }

  sendEmailsToUsers(selectedUsers: User[]) {
    this.userService.sendEmailsService(selectedUsers).subscribe((result) => {
      result.forEach((email, index) => {
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Message was sent to: ${email}`,
          });
        }, index * 500);
      });
    });
  }
}