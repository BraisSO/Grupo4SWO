import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtCurrenciesComponent } from './ext-currencies.component';

describe('ExtCurrenciesComponent', () => {
  let component: ExtCurrenciesComponent;
  let fixture: ComponentFixture<ExtCurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtCurrenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
