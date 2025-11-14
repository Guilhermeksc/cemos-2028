import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EconomiaAzul } from './economia-azul';

describe('EconomiaAzul', () => {
  let component: EconomiaAzul;
  let fixture: ComponentFixture<EconomiaAzul>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EconomiaAzul]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EconomiaAzul);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
