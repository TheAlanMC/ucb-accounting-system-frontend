import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyJournalPageComponent } from './daily-journal-page.component';

describe('DailyJournalPageComponent', () => {
  let component: DailyJournalPageComponent;
  let fixture: ComponentFixture<DailyJournalPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyJournalPageComponent]
    });
    fixture = TestBed.createComponent(DailyJournalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
