import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsBar } from './collections-bar';

describe('CollectionsBar', () => {
  let component: CollectionsBar;
  let fixture: ComponentFixture<CollectionsBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionsBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionsBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
