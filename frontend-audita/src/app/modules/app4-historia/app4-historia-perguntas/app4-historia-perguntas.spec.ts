import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App4HistoriaPerguntas } from './app4-historia-perguntas';

describe('App4HistoriaPerguntas', () => {
  let component: App4HistoriaPerguntas;
  let fixture: ComponentFixture<App4HistoriaPerguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App4HistoriaPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App4HistoriaPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
