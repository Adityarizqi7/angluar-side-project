import { TestBed } from '@angular/core/testing';

import { UserBioService } from './user-bio.service';

describe('UserBioService', () => {
  let service: UserBioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
