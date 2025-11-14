import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ema420 } from './ema-420';

describe('Ema420', () => {
  let component: Ema420;
  let fixture: ComponentFixture<Ema420>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ema420]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ema420);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
