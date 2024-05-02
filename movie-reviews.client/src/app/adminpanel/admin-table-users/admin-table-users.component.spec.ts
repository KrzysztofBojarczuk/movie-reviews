import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableUsersComponent } from './admin-tableuser.component';

describe('UserstableComponent', () => {
  let component: AdminTableUsersComponent;
  let fixture: ComponentFixture<AdminTableUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTableUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTableUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
