import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintableuserComponent } from './admintableuser.component';

describe('UserstableComponent', () => {
  let component: AdmintableuserComponent;
  let fixture: ComponentFixture<AdmintableuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmintableuserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdmintableuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
