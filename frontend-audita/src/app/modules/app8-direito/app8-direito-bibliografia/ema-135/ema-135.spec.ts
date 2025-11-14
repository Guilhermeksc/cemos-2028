import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ema135 } from './ema-135';

describe('Ema135', () => {
  let component: Ema135;
  let fixture: ComponentFixture<Ema135>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ema135]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ema135);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
