import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';

describe('UserService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });
});