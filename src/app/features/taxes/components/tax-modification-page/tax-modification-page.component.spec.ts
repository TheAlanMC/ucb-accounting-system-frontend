import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxModificationPageComponent } from './tax-modification-page.component';

describe('TaxModificationPageComponent', () => {
  let component: TaxModificationPageComponent;
  let fixture: ComponentFixture<TaxModificationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxModificationPageComponent]
    });
    fixture = TestBed.createComponent(TaxModificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
