import { Component } from '@angular/core';
import { User } from '../../../models/user';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { UsersService } from '../../../services/users.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminUpdateUserComponent } from '../admin-update-user/admin-update-user.component';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
import { RegisterRequest } from '../../../models/register-request';
import { UserReviewerFormComponent } from '../admin-user-reviewer-form/user-reviewer-form.component';

@Component({
  selector: 'app-admin-table-users',
  templateUrl: './admin-table-users.component.html',
  styleUrl: './admin-table-users.component.css',
  providers: [ConfirmationService, MessageService, DialogService],
})
export class AdminTableUsersComponent {
  users: User[] = [];
  value = '';
  userNumber: number = 0;
  selectedUsers: User[] = [];

  expandedRows = {};

  ref: DynamicDialogRef | undefined;

  public columns = [
    { field: 'id', header: 'Id' },
    { field: 'userName', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'action', header: 'Action' },
  ];

  constructor(
    private userService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.getAllUsersAdmin();
    this.getNumberOfUsers();
  }

  expandAll() {
    this.expandedRows = new Map(this.users.map((user) => [user.id, true]));
  }

  collapseAll() {
    this.expandedRows = {};
  }

  onRowExpand(event: TableRowExpandEvent) {
    this.messageService.add({
      severity: 'info',
      summary: 'User Expanded',
      detail: event.data.name,
      life: 3000,
    });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'User Collapsed',
      detail: event.data.name,
      life: 3000,
    });
  }

  getNumberOfUsers() {
    this.userService.numberOfUsersService().subscribe((result) => {
      this.userNumber = result;
    });
  }

  clearFilter() {
    this.value = '';
    this.getAllUsersAdmin(this.value);
  }

  getAllUsersAdmin(searchTerm = '') {
    this.userService.getAllUserAdminServices(searchTerm).subscribe((result) => {
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
          this.getAllUsersAdmin();
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

  deleteReview(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this Review?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',

      accept: () => {
        this.reviewService.deleteReviewService(id).subscribe((result) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Review deleted successfully',
          });
          this.getAllUsersAdmin();
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

  addingUserReviewer() {
    const ref = this.dialogService.open(UserReviewerFormComponent, {
      header: 'Add Reviewer',
      width: '30%',
      height: '35%',
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        if (result.accepted) {
          this.messageService.add({
            severity: 'success',
            summary: 'User Updated',
            detail: `User has been added successfully.`,
          });
        } else if (result.rejected) {
          this.messageService.add({
            severity: 'error',
            summary: 'Update Cancelled',
            detail: `User has been not added.`,
          });
        }
      } else {
        this.messageService.add({
          severity: 'info',
          summary: 'Dialog Closed',
          detail: `Dialog was closed without any action.`,
        });
      }
      this.getAllUsersAdmin();
    });
  }

  updateUser(users: User) {
    const ref = this.dialogService.open(AdminUpdateUserComponent, {
      header: 'Update User',
      width: '70%',
      data: {
        userData: users,
      },
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        if (result.accepted) {
          this.messageService.add({
            severity: 'success',
            summary: 'User Updated',
            detail: `User ${users.userName} has been updated successfully.`,
          });
        } else if (result.rejected) {
          this.messageService.add({
            severity: 'error',
            summary: 'Update Cancelled',
            detail: `User ${users.userName} update has been cancelled.`,
          });
        }
      } else {
        this.messageService.add({
          severity: 'info',
          summary: 'Dialog Closed',
          detail: `Dialog was closed without any action.`,
        });
      }
      this.getAllUsersAdmin();
    });
  }
}
