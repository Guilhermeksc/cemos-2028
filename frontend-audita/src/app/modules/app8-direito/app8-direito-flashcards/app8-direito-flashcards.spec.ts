import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App8DireitoFlashcards } from './app8-direito-flashcards';

describe('App8DireitoFlashcards', () => {
  let component: App8DireitoFlashcards;
  let fixture: ComponentFixture<App8DireitoFlashcards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App8DireitoFlashcards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App8DireitoFlashcards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
