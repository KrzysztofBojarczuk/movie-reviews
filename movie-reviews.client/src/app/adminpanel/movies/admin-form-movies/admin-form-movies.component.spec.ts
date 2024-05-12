import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormMoviesComponent } from './admin-form-movies.component';

describe('AdminFormMoviesComponent', () => {
  let component: AdminFormMoviesComponent;
  let fixture: ComponentFixture<AdminFormMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFormMoviesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
