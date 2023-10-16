import { TestBed } from '@angular/core/testing';

import { AccountPlanService } from './account-plan.service';

describe('AccountPlanService', () => {
  let service: AccountPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
