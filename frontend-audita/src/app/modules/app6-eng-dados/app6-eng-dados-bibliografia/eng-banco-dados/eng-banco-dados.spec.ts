import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngBancoDados } from './eng-banco-dados';

describe('EngBancoDados', () => {
  let component: EngBancoDados;
  let fixture: ComponentFixture<EngBancoDados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngBancoDados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngBancoDados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
