import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6GeopoliticaRelacoesInternacionaisResumo } from './app6-geopolitica-relacoes-internacionais-resumo';

describe('App6GeopoliticaRelacoesInternacionaisResumo', () => {
  let component: App6GeopoliticaRelacoesInternacionaisResumo;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionaisResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6GeopoliticaRelacoesInternacionaisResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6GeopoliticaRelacoesInternacionaisResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
