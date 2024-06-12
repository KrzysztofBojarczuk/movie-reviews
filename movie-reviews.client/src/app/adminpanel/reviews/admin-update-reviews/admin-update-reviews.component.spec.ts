import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateReviewsComponent } from './admin-update-reviews.component';

describe('AdminUpdateReviewsComponent', () => {
  let component: AdminUpdateReviewsComponent;
  let fixture: ComponentFixture<AdminUpdateReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUpdateReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUpdateReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
