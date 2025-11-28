import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App3PlanejamentoMilitarFlashcards } from './app3-planejamento-militar-flashcards';

describe('App3PlanejamentoMilitarFlashcards', () => {
  let component: App3PlanejamentoMilitarFlashcards;
  let fixture: ComponentFixture<App3PlanejamentoMilitarFlashcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App3PlanejamentoMilitarFlashcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App3PlanejamentoMilitarFlashcards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
