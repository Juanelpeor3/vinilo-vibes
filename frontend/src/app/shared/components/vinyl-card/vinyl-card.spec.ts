import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylCard } from './vinyl-card';

describe('VinylCard', () => {
  let component: VinylCard;
  let fixture: ComponentFixture<VinylCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinylCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
