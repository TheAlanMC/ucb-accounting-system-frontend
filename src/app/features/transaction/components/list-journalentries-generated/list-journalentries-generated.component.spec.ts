import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJournalentriesGeneratedComponent } from './list-journalentries-generated.component';

describe('ListJournalentriesGeneratedComponent', () => {
  let component: ListJournalentriesGeneratedComponent;
  let fixture: ComponentFixture<ListJournalentriesGeneratedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListJournalentriesGeneratedComponent]
    });
    fixture = TestBed.createComponent(ListJournalentriesGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
