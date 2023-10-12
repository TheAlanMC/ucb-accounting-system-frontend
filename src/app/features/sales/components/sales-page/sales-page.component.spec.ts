import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPageComponent } from './sales-page.component';

describe('SalesPageComponent', () => {
  let component: SalesPageComponent;
  let fixture: ComponentFixture<SalesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesPageComponent]
    });
    fixture = TestBed.createComponent(SalesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
