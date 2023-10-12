import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePageComponent } from './invoice-page.component';

describe('InvoicePageComponent', () => {
  let component: InvoicePageComponent;
  let fixture: ComponentFixture<InvoicePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicePageComponent]
    });
    fixture = TestBed.createComponent(InvoicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
