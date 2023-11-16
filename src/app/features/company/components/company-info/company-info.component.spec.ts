import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoComponent } from './company-info.component';

describe('CompanyComponent', () => {
  let component: CompanyInfoComponent;
  let fixture: ComponentFixture<CompanyInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyInfoComponent]
    });
    fixture = TestBed.createComponent(CompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
