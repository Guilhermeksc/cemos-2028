import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ema301 } from './ema301';

describe('Ema301', () => {
  let component: Ema301;
  let fixture: ComponentFixture<Ema301>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ema301]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ema301);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
