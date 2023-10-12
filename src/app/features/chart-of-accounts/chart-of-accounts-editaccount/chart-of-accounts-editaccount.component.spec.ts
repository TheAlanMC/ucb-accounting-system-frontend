import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOfAccountsEditaccountComponent } from './chart-of-accounts-editaccount.component';

describe('ChartOfAccountsEditaccountComponent', () => {
  let component: ChartOfAccountsEditaccountComponent;
  let fixture: ComponentFixture<ChartOfAccountsEditaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartOfAccountsEditaccountComponent]
    });
    fixture = TestBed.createComponent(ChartOfAccountsEditaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
