import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasGerais } from './estatisticas-gerais';

describe('EstatisticasGerais', () => {
  let component: EstatisticasGerais;
  let fixture: ComponentFixture<EstatisticasGerais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatisticasGerais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatisticasGerais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
