import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App1IntendenciaPerguntas } from './app1-intendencia-perguntas';

describe('App1IntendenciaPerguntas', () => {
  let component: App1IntendenciaPerguntas;
  let fixture: ComponentFixture<App1IntendenciaPerguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App1IntendenciaPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App1IntendenciaPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
