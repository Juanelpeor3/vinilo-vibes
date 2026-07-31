import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylAdminCard } from './vinyl-admin-card';

describe('VinylAdminCard', () => {
  let component: VinylAdminCard;
  let fixture: ComponentFixture<VinylAdminCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylAdminCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinylAdminCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
