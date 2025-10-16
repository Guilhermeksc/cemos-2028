import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6GeopoliticaRelacoesInternacionaisConceitos } from './app6-geopolitica-relacoes-internacionais-conceitos';

describe('App6GeopoliticaRelacoesInternacionaisConceitos', () => {
  let component: App6GeopoliticaRelacoesInternacionaisConceitos;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionaisConceitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6GeopoliticaRelacoesInternacionaisConceitos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6GeopoliticaRelacoesInternacionaisConceitos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
