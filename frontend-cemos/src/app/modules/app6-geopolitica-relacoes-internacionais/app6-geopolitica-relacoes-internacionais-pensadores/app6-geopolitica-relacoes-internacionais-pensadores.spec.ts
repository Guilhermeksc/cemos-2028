import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6GeopoliticaRelacoesInternacionaisPensadores } from './app6-geopolitica-relacoes-internacionais-pensadores';

describe('App6GeopoliticaRelacoesInternacionaisPensadores', () => {
  let component: App6GeopoliticaRelacoesInternacionaisPensadores;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionaisPensadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6GeopoliticaRelacoesInternacionaisPensadores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6GeopoliticaRelacoesInternacionaisPensadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
