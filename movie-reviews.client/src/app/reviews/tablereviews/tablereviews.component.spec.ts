import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablereviewsComponent } from './tablereviews.component';

describe('TablereviewsComponent', () => {
  let component: TablereviewsComponent;
  let fixture: ComponentFixture<TablereviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablereviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablereviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
