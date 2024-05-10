import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableMoviesComponent } from './admin-table-movies.component';

describe('AdminTableMoviesComponent', () => {
  let component: AdminTableMoviesComponent;
  let fixture: ComponentFixture<AdminTableMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTableMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTableMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
