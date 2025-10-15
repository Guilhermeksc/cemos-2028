import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App5InglesPerguntas } from './app5-ingles-perguntas';

describe('App5InglesPerguntas', () => {
  let component: App5InglesPerguntas;
  let fixture: ComponentFixture<App5InglesPerguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App5InglesPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App5InglesPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
