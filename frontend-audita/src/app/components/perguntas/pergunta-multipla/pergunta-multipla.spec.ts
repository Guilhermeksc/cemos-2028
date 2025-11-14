import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaMultipla } from './pergunta-multipla';

describe('PerguntaMultipla', () => {
  let component: PerguntaMultipla;
  let fixture: ComponentFixture<PerguntaMultipla>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerguntaMultipla]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerguntaMultipla);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
