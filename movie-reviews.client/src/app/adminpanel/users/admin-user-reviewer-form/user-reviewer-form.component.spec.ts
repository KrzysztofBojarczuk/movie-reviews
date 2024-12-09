import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewerFormComponent } from './user-reviewer-form.component';

describe('UserReviewerFormComponent', () => {
  let component: UserReviewerFormComponent;
  let fixture: ComponentFixture<UserReviewerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserReviewerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserReviewerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
