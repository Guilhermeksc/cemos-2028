import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App3PlanejamentoMilitarResumo } from './app3-planejamento-militar-resumo';

describe('App3PlanejamentoMilitarResumo', () => {
  let component: App3PlanejamentoMilitarResumo;
  let fixture: ComponentFixture<App3PlanejamentoMilitarResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App3PlanejamentoMilitarResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App3PlanejamentoMilitarResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
