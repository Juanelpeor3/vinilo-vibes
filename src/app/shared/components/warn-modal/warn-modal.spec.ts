import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnModal } from './warn-modal';

describe('WarnModal', () => {
  let component: WarnModal;
  let fixture: ComponentFixture<WarnModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarnModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarnModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
