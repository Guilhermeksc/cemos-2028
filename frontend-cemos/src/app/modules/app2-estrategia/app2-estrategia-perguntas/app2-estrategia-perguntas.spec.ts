import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2EstrategiaPerguntas } from './app2-estrategia-perguntas';

describe('App2EstrategiaPerguntas', () => {
  let component: App2EstrategiaPerguntas;
  let fixture: ComponentFixture<App2EstrategiaPerguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App2EstrategiaPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App2EstrategiaPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
