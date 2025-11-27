import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ema020 } from './ema020';

describe('Ema020', () => {
  let component: Ema020;
  let fixture: ComponentFixture<Ema020>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ema020]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ema020);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
