import { TestBed } from '@angular/core/testing';

import { TokenjwtGuard } from './tokenjwt.guard';

describe('TokenjwtGuard', () => {
  let guard: TokenjwtGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenjwtGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
