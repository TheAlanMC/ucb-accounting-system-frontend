import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeStatementsComponent } from './income-statements.component';

describe('IncomeStatementsComponent', () => {
  let component: IncomeStatementsComponent;
  let fixture: ComponentFixture<IncomeStatementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeStatementsComponent]
    });
    fixture = TestBed.createComponent(IncomeStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
