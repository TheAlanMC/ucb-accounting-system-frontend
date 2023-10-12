import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFormComponent } from './sales-form.component';

describe('SalesFormComponent', () => {
  let component: SalesFormComponent;
  let fixture: ComponentFixture<SalesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesFormComponent]
    });
    fixture = TestBed.createComponent(SalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
