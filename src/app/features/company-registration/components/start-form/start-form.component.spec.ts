import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFormComponent } from './start-form.component';

describe('StartFormComponent', () => {
  let component: StartFormComponent;
  let fixture: ComponentFixture<StartFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartFormComponent]
    });
    fixture = TestBed.createComponent(StartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
