import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintablereviewsComponent } from './admintablereviews.component';

describe('TablereviewsComponent', () => {
  let component: AdmintablereviewsComponent;
  let fixture: ComponentFixture<AdmintablereviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmintablereviewsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdmintablereviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
