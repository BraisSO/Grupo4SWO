import { TestBed } from '@angular/core/testing';
import { OwnExpensesService } from './own-expenses.service';



describe('OwnExpensesServiceService', () => {
  let service: OwnExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
