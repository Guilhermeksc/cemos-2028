import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntaVF } from './pergunta-v-f';

describe('PerguntaVF', () => {
  let component: PerguntaVF;
  let fixture: ComponentFixture<PerguntaVF>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerguntaVF]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerguntaVF);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
