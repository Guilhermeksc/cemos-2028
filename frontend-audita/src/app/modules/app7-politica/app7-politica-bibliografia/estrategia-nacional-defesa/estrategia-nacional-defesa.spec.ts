import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrategiaNacionalDefesa } from './estrategia-nacional-defesa';

describe('EstrategiaNacionalDefesa', () => {
  let component: EstrategiaNacionalDefesa;
  let fixture: ComponentFixture<EstrategiaNacionalDefesa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstrategiaNacionalDefesa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstrategiaNacionalDefesa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
