import { TestBed } from '@angular/core/testing';
import { ownExpensesService } from './own-expenses.service';



describe('OwnExpensesServiceService', () => {
  let service: ownExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ownExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
