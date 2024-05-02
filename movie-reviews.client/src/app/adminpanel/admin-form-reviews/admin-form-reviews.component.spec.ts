import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormReviewsComponent } from './admin-form-reviews.component';

describe('FormreviewsComponent', () => {
  let component: AdminFormReviewsComponent;
  let fixture: ComponentFixture<AdminFormReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFormReviewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
