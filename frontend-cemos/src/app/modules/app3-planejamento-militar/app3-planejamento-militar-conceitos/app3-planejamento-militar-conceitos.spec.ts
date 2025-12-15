import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App3PlanejamentoMilitarConceitos } from './app3-planejamento-militar-conceitos';

describe('App3PlanejamentoMilitarConceitos', () => {
  let component: App3PlanejamentoMilitarConceitos;
  let fixture: ComponentFixture<App3PlanejamentoMilitarConceitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App3PlanejamentoMilitarConceitos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App3PlanejamentoMilitarConceitos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
