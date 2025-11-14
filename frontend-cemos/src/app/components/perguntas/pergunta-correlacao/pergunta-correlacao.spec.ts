import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaCorrelacao } from './pergunta-correlacao';

describe('PerguntaCorrelacao', () => {
  let component: PerguntaCorrelacao;
  let fixture: ComponentFixture<PerguntaCorrelacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerguntaCorrelacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerguntaCorrelacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
