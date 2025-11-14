import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App9EconomiaPerguntas } from './app9-economia-perguntas';

describe('App9EconomiaPerguntas', () => {
  let component: App9EconomiaPerguntas;
  let fixture: ComponentFixture<App9EconomiaPerguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App9EconomiaPerguntas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App9EconomiaPerguntas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
