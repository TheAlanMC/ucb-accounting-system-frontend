import { TestBed } from '@angular/core/testing';

import { UserListCompanyService } from './user-list-company.service';

describe('UserListCompanyService', () => {
  let service: UserListCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
