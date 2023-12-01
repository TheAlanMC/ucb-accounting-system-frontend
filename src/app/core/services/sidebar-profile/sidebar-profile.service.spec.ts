import { TestBed } from '@angular/core/testing';

import { SidebarProfileService } from './sidebar-profile.service';

describe('SidebarService', () => {
  let service: SidebarProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
