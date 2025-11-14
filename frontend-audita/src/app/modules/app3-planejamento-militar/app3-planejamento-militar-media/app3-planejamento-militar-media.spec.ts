import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App3PlanejamentoMilitarMedia } from './app3-planejamento-militar-media/app3-planejamento-militar-media';

describe('App3PlanejamentoMilitarMedia', () => {
  let component: App3PlanejamentoMilitarMedia;
  let fixture: ComponentFixture<App3PlanejamentoMilitarMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App3PlanejamentoMilitarMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App3PlanejamentoMilitarMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
