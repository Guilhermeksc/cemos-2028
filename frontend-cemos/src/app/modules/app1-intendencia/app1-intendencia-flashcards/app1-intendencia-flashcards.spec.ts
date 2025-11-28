import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App1IntendenciaFlashcards } from './app1-intendencia-flashcards';

describe('App1IntendenciaFlashcards', () => {
  let component: App1IntendenciaFlashcards;
  let fixture: ComponentFixture<App1IntendenciaFlashcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App1IntendenciaFlashcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App1IntendenciaFlashcards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
