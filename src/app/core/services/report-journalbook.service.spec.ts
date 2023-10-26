import { TestBed } from '@angular/core/testing';

import { ReportJournalbookService } from './report-journalbook.service';

describe('ReportJournalbookService', () => {
  let service: ReportJournalbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportJournalbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
