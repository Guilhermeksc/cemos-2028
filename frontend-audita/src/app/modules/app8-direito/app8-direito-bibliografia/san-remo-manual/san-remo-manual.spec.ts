import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanRemoManual } from './san-remo-manual';

describe('SanRemoManual', () => {
  let component: SanRemoManual;
  let fixture: ComponentFixture<SanRemoManual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanRemoManual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanRemoManual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
