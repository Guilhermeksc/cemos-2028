import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ema400 } from './ema-400';

describe('Ema400', () => {
  let component: Ema400;
  let fixture: ComponentFixture<Ema400>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ema400]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ema400);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
