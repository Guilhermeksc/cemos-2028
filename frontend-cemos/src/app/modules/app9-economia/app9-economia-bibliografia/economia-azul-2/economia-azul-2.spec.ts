import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomiaAzul2 } from './economia-azul-2';

describe('EconomiaAzul2', () => {
  let component: EconomiaAzul2;
  let fixture: ComponentFixture<EconomiaAzul2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomiaAzul2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EconomiaAzul2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
