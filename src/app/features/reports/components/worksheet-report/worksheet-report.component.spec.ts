import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetReportComponent } from './worksheet-report.component';

describe('WorksheetReportComponent', () => {
  let component: WorksheetReportComponent;
  let fixture: ComponentFixture<WorksheetReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorksheetReportComponent]
    });
    fixture = TestBed.createComponent(WorksheetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
