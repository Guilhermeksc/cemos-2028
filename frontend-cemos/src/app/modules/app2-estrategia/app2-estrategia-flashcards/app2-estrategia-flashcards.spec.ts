import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2EstrategiaFlashcards } from './app2-estrategia-flashcards';

describe('App2EstrategiaFlashcards', () => {
  let component: App2EstrategiaFlashcards;
  let fixture: ComponentFixture<App2EstrategiaFlashcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App2EstrategiaFlashcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App2EstrategiaFlashcards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
