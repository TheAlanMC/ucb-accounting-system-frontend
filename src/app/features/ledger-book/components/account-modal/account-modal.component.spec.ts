import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountModalComponent } from './account-modal.component';

describe('AccountModalComponent', () => {
  let component: AccountModalComponent;
  let fixture: ComponentFixture<AccountModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountModalComponent]
    });
    fixture = TestBed.createComponent(AccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
