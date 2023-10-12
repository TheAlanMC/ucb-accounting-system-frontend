import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFormComponent } from './purchase-form.component';

describe('PurchaseFormComponent', () => {
  let component: PurchaseFormComponent;
  let fixture: ComponentFixture<PurchaseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseFormComponent]
    });
    fixture = TestBed.createComponent(PurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
