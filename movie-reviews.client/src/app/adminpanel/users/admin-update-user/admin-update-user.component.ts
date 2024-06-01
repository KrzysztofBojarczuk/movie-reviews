import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrl: './admin-update-user.component.css',
})
export class AdminUpdateUserComponent {
  user!: User;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private userService: UsersService
  ) {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      emailConfirmed: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      phoneNumberConfirmed: ['', Validators.required],
      twoFactorEnabled: ['', Validators.required],
      lockoutEnd: ['', Validators.required],
      lockoutEnabled: ['', Validators.required],
      active: ['', Validators.required],
      normalizedUserName: ['', Validators.required],
      normalizedEmail: ['', Validators.required],
      concurrencyStamp: ['', Validators.required],
      passwordHash: ['', Validators.required],
      securityStamp: ['', Validators.required],
    });
  }

  //   this.userForm = this.formBuilder.group({
  //     userName: ['', Validators.required],
  //     email: ['', Validators.required],
  //     emailConfirmed: [{ value: '', disabled: true }],
  //     phoneNumber: ['', Validators.required],
  //     phoneNumberConfirmed: [{ value: '', disabled: true }],
  //     twoFactorEnabled: [{ value: '', disabled: true }],
  //     lockoutEnd: [{ value: '', disabled: true }],
  //     lockoutEnabled: [{ value: '', disabled: true }],
  //     active: [false, Validators.required],
  //     normalizedUserName: [{ value: '', disabled: true }],
  //     normalizedEmail: [{ value: '', disabled: true }],
  //     concurrencyStamp: [{ value: '', disabled: true }],
  //     passwordHash: [{ value: '', disabled: true }],
  //     securityStamp: [{ value: '', disabled: true }],
  //   });
  // }

  ngOnInit(): void {
    this.user = { ...this.config.data.userData };

    this.userForm.patchValue({
      userName: this.user.userName,
      email: this.user.email,
      emailConfirmed: this.user.emailConfirmed,
      phoneNumber: this.user.phoneNumber,
      phoneNumberConfirmed: this.user.phoneNumberConfirmed,
      twoFactorEnabled: this.user.twoFactorEnabled,
      lockoutEnd: this.user.lockoutEnd,
      lockoutEnabled: this.user.lockoutEnabled,
      active: this.user.active,
      normalizedUserName: this.user.normalizedUserName,
      normalizedEmail: this.user.normalizedEmail,
      concurrencyStamp: this.user.concurrencyStamp,
      passwordHash: this.user.passwordHash,
      securityStamp: this.user.securityStamp,
    });
  }

  submit(user: User): void {
    this.userService.updateUserService(this.user.id, user).subscribe(
      () => {
        this.ref.close({ accepted: true });
      },
      (error) => {
        this.ref.close({ rejected: true });
      }
    );
  }
}
