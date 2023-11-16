import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalBookReportComponent } from './journal-book-report.component';

describe('JournalBookReportComponent', () => {
  let component: JournalBookReportComponent;
  let fixture: ComponentFixture<JournalBookReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JournalBookReportComponent]
    });
    fixture = TestBed.createComponent(JournalBookReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
