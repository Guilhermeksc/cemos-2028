import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App3PlanejamentoMilitarPerguntas } from './app3-planejamento-militar-perguntas';

describe('App3PlanejamentoMilitarPerguntas', () => {
  let component: App3PlanejamentoMilitarPerguntas;
  let fixture: ComponentFixture<App3PlanejamentoMilitarPerguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App3PlanejamentoMilitarPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App3PlanejamentoMilitarPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
