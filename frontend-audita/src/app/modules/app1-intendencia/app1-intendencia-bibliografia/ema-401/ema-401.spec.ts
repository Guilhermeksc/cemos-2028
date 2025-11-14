import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ema401 } from './ema-401';

describe('Ema401', () => {
  let component: Ema401;
  let fixture: ComponentFixture<Ema401>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ema401]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ema401);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
