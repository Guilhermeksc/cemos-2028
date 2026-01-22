import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6RelacoesInternacionaisPerguntas } from './app6-1-relacoes-internacionais-perguntas';

describe('App6RelacoesInternacionaisPerguntas', () => {
  let component: App6RelacoesInternacionaisPerguntas;
  let fixture: ComponentFixture<App6RelacoesInternacionaisPerguntas>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6RelacoesInternacionaisPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6RelacoesInternacionaisPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
