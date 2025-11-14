import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App4HistoriaFlashcards } from './app4-historia-flashcards';

describe('App4HistoriaFlashcards', () => {
  let component: App4HistoriaFlashcards;
  let fixture: ComponentFixture<App4HistoriaFlashcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App4HistoriaFlashcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App4HistoriaFlashcards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
