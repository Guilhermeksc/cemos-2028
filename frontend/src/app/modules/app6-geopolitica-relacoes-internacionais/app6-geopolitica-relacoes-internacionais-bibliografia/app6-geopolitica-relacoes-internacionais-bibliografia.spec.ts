import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6GeopoliticaRelacoesInternacionaisBibliografia } from './app6-geopolitica-relacoes-internacionais-bibliografia';

describe('App6GeopoliticaRelacoesInternacionaisBibliografia', () => {
  let component: App6GeopoliticaRelacoesInternacionaisBibliografia;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionaisBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6GeopoliticaRelacoesInternacionaisBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6GeopoliticaRelacoesInternacionaisBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
