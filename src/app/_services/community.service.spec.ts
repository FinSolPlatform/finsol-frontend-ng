import { TestBed } from '@angular/core/testing';

import { CommunityService } from './community.service';

describe('UserService', () => {
  let service: CommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityService);
  });
});