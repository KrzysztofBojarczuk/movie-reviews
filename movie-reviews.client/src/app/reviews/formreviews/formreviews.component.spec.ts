import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormreviewsComponent } from './formreviews.component';

describe('FormreviewsComponent', () => {
  let component: FormreviewsComponent;
  let fixture: ComponentFixture<FormreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormreviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
