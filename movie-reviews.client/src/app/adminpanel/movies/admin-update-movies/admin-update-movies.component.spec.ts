import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateMoviesComponent } from './admin-update-movies.component';

describe('AdminUpdateMoviesComponent', () => {
  let component: AdminUpdateMoviesComponent;
  let fixture: ComponentFixture<AdminUpdateMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUpdateMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUpdateMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
