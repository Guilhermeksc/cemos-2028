import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6GeopoliticaRelacoesInternacionaisPerguntas } from './app6-geopolitica-relacoes-internacionais-perguntas';

describe('App6GeopoliticaRelacoesInternacionaisPerguntas', () => {
  let component: App6GeopoliticaRelacoesInternacionaisPerguntas;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionaisPerguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6GeopoliticaRelacoesInternacionaisPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6GeopoliticaRelacoesInternacionaisPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
