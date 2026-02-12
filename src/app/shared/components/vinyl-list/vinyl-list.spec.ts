import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylList } from './vinyl-list';

describe('VinylList', () => {
  let component: VinylList;
  let fixture: ComponentFixture<VinylList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinylList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
