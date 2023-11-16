import { TestBed } from '@angular/core/testing';

import { GeneratedReportsListService } from './generated-reports-list.service';

describe('GeneratedReportsListService', () => {
  let service: GeneratedReportsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratedReportsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
