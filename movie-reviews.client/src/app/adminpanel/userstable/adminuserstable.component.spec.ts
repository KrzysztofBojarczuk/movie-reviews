import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserstableComponent } from './adminuserstable.component';

describe('UserstableComponent', () => {
  let component: AdminuserstableComponent;
  let fixture: ComponentFixture<AdminuserstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminuserstableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminuserstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
