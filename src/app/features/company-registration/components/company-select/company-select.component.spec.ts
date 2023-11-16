import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySelectComponent } from './company-select.component';

describe('CompanySelectComponent', () => {
  let component: CompanySelectComponent;
  let fixture: ComponentFixture<CompanySelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanySelectComponent]
    });
    fixture = TestBed.createComponent(CompanySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
