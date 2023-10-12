import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSalesComponent } from './all-sales.component';

describe('AllSalesComponent', () => {
  let component: AllSalesComponent;
  let fixture: ComponentFixture<AllSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSalesComponent]
    });
    fixture = TestBed.createComponent(AllSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
