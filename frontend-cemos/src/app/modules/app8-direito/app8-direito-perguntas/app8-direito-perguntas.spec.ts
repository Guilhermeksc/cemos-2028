import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App8DireitoPerguntas } from './app8-direito-perguntas';

describe('App8DireitoPerguntas', () => {
  let component: App8DireitoPerguntas;
  let fixture: ComponentFixture<App8DireitoPerguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App8DireitoPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App8DireitoPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
