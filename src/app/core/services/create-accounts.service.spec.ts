import { TestBed } from '@angular/core/testing';

import { CreateAccountsService } from './create-accounts.service';

describe('CreateAccountsService', () => {
  let service: CreateAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
