import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOfAccountsAddaccountComponent } from './chart-of-accounts-addaccount.component';

describe('ChartOfAccountsAddaccountComponent', () => {
  let component: ChartOfAccountsAddaccountComponent;
  let fixture: ComponentFixture<ChartOfAccountsAddaccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartOfAccountsAddaccountComponent]
    });
    fixture = TestBed.createComponent(ChartOfAccountsAddaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
