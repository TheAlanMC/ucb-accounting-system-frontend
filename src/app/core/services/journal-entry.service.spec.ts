import { TestBed } from '@angular/core/testing';

import { JournalEntryService } from './journal-entry.service';

describe('JournalEntryService', () => {
  let service: JournalEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournalEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
