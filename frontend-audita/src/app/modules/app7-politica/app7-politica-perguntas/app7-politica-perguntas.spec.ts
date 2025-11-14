import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App7PoliticaPerguntas } from './app7-politica-perguntas';

describe('App7PoliticaPerguntas', () => {
  let component: App7PoliticaPerguntas;
  let fixture: ComponentFixture<App7PoliticaPerguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App7PoliticaPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App7PoliticaPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
