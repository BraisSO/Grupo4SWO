import { TestBed } from '@angular/core/testing';

import { ExtMoneyService } from './ext-money.service';

describe('ExtMoneyService', () => {
  let service: ExtMoneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtMoneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
