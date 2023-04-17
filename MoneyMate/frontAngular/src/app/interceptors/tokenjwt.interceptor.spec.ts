import { TestBed } from '@angular/core/testing';

import { TokenjwtInterceptor } from './tokenjwt.interceptor';

describe('TokenjwtInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenjwtInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenjwtInterceptor = TestBed.inject(TokenjwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
