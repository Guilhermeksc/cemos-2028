import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacoesInternacionais } from './relacoes-internacionais';

describe('RelacoesInternacionais', () => {
  let component: RelacoesInternacionais;
  let fixture: ComponentFixture<RelacoesInternacionais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelacoesInternacionais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelacoesInternacionais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
