import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinylAdminList } from './vinyl-admin-list';

describe('VinylAdminList', () => {
  let component: VinylAdminList;
  let fixture: ComponentFixture<VinylAdminList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinylAdminList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinylAdminList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
