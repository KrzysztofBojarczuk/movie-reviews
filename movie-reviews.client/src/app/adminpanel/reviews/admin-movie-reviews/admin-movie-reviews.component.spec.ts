import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMovieReviewsComponent } from './admin-movie-reviews.component';

describe('AdminMovieReviewsComponent', () => {
  let component: AdminMovieReviewsComponent;
  let fixture: ComponentFixture<AdminMovieReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMovieReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMovieReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
