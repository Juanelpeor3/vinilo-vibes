import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylDetails } from './vinyl-details';

describe('VinylDetails', () => {
  let component: VinylDetails;
  let fixture: ComponentFixture<VinylDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinylDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
