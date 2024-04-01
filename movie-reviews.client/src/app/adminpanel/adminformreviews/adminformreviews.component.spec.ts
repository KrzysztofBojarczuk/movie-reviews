import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminformreviewsComponent } from './adminformreviews.component';

describe('FormreviewsComponent', () => {
  let component: AdminformreviewsComponent;
  let fixture: ComponentFixture<AdminformreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminformreviewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminformreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
