import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateModalComponent } from './date-modal.component';

describe('DateModalComponent', () => {
  let component: DateModalComponent;
  let fixture: ComponentFixture<DateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateModalComponent]
    });
    fixture = TestBed.createComponent(DateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
