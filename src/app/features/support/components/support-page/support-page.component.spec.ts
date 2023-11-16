import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPageComponent } from './support-page.component';

describe('SupportPageComponent', () => {
  let component: SupportPageComponent;
  let fixture: ComponentFixture<SupportPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportPageComponent]
    });
    fixture = TestBed.createComponent(SupportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
