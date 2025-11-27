import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App3PlanejamentoMilitarBibliografia } from './app3-planejamento-militar-bibliografia';

describe('App3PlanejamentoMilitarBibliografia', () => {
  let component: App3PlanejamentoMilitarBibliografia;
  let fixture: ComponentFixture<App3PlanejamentoMilitarBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App3PlanejamentoMilitarBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App3PlanejamentoMilitarBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
