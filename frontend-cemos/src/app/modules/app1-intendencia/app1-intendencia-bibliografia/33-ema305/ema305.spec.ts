import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ema305 } from './ema305';

describe('Ema305', () => {
  let component: Ema305;
  let fixture: ComponentFixture<Ema305>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ema305]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ema305);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
