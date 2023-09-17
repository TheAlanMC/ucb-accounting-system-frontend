import { TestBed } from '@angular/core/testing';

import { UserPasswordService } from './user-password.service';

describe('UserPasswordService', () => {
  let service: UserPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
