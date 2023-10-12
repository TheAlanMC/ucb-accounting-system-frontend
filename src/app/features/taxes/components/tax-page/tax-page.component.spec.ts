import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPageComponent } from './tax-page.component';

describe('TaxPageComponent', () => {
  let component: TaxPageComponent;
  let fixture: ComponentFixture<TaxPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxPageComponent]
    });
    fixture = TestBed.createComponent(TaxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
