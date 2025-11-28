import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App9EconomiaFlashcards } from './app9-economia-flashcards';

describe('App9EconomiaFlashcards', () => {
  let component: App9EconomiaFlashcards;
  let fixture: ComponentFixture<App9EconomiaFlashcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App9EconomiaFlashcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App9EconomiaFlashcards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
