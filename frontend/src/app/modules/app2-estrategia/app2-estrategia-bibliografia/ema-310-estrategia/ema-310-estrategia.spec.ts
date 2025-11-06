import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ema310Estrategia } from './ema-310-estrategia';

describe('Ema310Estrategia', () => {
  let component: Ema310Estrategia;
  let fixture: ComponentFixture<Ema310Estrategia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ema310Estrategia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ema310Estrategia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
