import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6GeopoliticaRelacoesInternacionaisFlashcards } from './app6-geopolitica-relacoes-internacionais-flashcards';

describe('App6GeopoliticaRelacoesInternacionaisFlashcards', () => {
  let component: App6GeopoliticaRelacoesInternacionaisFlashcards;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionaisFlashcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6GeopoliticaRelacoesInternacionaisFlashcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6GeopoliticaRelacoesInternacionaisFlashcards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
