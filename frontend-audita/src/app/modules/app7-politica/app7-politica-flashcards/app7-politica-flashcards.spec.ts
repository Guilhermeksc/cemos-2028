import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App7PoliticaFlashcards } from './app7-politica-flashcards';

describe('App7PoliticaFlashcards', () => {
  let component: App7PoliticaFlashcards;
  let fixture: ComponentFixture<App7PoliticaFlashcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App7PoliticaFlashcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App7PoliticaFlashcards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
