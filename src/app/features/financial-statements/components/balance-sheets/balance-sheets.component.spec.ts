import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSheetsComponent } from './balance-sheets.component';

describe('BalanceSheetsComponent', () => {
  let component: BalanceSheetsComponent;
  let fixture: ComponentFixture<BalanceSheetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceSheetsComponent]
    });
    fixture = TestBed.createComponent(BalanceSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
