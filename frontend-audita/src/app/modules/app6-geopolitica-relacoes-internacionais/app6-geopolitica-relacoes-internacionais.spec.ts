import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6GeopoliticaRelacoesInternacionais } from './app6-geopolitica-relacoes-internacionais';

describe('App6GeopoliticaRelacoesInternacionais', () => {
  let component: App6GeopoliticaRelacoesInternacionais;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6GeopoliticaRelacoesInternacionais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6GeopoliticaRelacoesInternacionais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
