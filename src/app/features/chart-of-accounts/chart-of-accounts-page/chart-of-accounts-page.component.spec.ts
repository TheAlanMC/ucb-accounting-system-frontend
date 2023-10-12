import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOfAccountsPageComponent } from './chart-of-accounts-page.component';

describe('ChartOfAccountsPageComponent', () => {
  let component: ChartOfAccountsPageComponent;
  let fixture: ComponentFixture<ChartOfAccountsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartOfAccountsPageComponent]
    });
    fixture = TestBed.createComponent(ChartOfAccountsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
