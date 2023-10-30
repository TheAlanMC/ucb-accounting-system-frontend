import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialBalanceComponent } from './trial-balance.component';

describe('TrialBalanceComponent', () => {
  let component: TrialBalanceComponent;
  let fixture: ComponentFixture<TrialBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrialBalanceComponent]
    });
    fixture = TestBed.createComponent(TrialBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
