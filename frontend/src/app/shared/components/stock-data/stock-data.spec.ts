import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockData } from './stock-data';

describe('StockData', () => {
  let component: StockData;
  let fixture: ComponentFixture<StockData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
