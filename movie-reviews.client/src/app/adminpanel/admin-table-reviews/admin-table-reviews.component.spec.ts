import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableReviewsComponent } from './admin-table-reviews.component';

describe('TablereviewsComponent', () => {
  let component: AdminTableReviewsComponent;
  let fixture: ComponentFixture<AdminTableReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTableReviewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTableReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
