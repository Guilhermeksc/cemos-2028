import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroIndividual } from './livro-individual';

describe('LivroIndividual', () => {
  let component: LivroIndividual;
  let fixture: ComponentFixture<LivroIndividual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroIndividual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroIndividual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
