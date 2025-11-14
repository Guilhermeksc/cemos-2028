import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ema323 } from './ema-323';

describe('Ema323', () => {
  let component: Ema323;
  let fixture: ComponentFixture<Ema323>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ema323]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ema323);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
