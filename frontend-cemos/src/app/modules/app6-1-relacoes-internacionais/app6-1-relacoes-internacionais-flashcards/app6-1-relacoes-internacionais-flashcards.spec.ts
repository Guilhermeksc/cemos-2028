import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6RelacoesInternacionaisFlashcards } from './app6-1-relacoes-internacionais-flashcards';
import { App6GeopoliticaRelacoesInternacionaisFlashcards } from '../../app6-geopolitica-relacoes-internacionais/app6-geopolitica-relacoes-internacionais-flashcards/app6-geopolitica-relacoes-internacionais-flashcards';

describe('App6GeopoliticaRelacoesInternacionaisFlashcards', () => {
  let component: App6GeopoliticaRelacoesInternacionaisFlashcards;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionaisFlashcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6RelacoesInternacionaisFlashcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6RelacoesInternacionaisFlashcards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
