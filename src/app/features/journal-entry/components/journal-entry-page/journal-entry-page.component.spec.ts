import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryPageComponent } from './journal-entry-page.component';


describe('JournalEntryPageComponent', () => {
  let component: JournalEntryPageComponent;
  let fixture: ComponentFixture<JournalEntryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryPageComponent]
    });
    fixture = TestBed.createComponent(JournalEntryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
