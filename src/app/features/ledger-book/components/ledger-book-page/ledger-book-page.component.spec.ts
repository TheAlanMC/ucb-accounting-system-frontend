import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerBookPageComponent } from './ledger-book-page.component';

describe('LedgerBookPageComponent', () => {
  let component: LedgerBookPageComponent;
  let fixture: ComponentFixture<LedgerBookPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LedgerBookPageComponent]
    });
    fixture = TestBed.createComponent(LedgerBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
