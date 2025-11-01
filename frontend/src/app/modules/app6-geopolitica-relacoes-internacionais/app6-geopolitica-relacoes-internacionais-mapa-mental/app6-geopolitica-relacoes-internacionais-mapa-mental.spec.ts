import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6GeopoliticaRelacoesInternacionaisMapaMental } from './app6-geopolitica-relacoes-internacionais-mapa-mental';

describe('App6GeopoliticaRelacoesInternacionaisMapaMental', () => {
  let component: App6GeopoliticaRelacoesInternacionaisMapaMental;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionaisMapaMental>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6GeopoliticaRelacoesInternacionaisMapaMental]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6GeopoliticaRelacoesInternacionaisMapaMental);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
