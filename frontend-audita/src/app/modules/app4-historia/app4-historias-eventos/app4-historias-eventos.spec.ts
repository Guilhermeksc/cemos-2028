import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App4HistoriasEventos } from './app4-historias-eventos';

describe('App4HistoriasEventos', () => {
  let component: App4HistoriasEventos;
  let fixture: ComponentFixture<App4HistoriasEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App4HistoriasEventos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App4HistoriasEventos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
