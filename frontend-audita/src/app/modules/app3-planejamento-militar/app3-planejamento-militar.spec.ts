import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App3PlanejamentoMilitar } from './app3-planejamento-militar';

describe('App3PlanejamentoMilitar', () => {
  let component: App3PlanejamentoMilitar;
  let fixture: ComponentFixture<App3PlanejamentoMilitar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App3PlanejamentoMilitar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App3PlanejamentoMilitar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
