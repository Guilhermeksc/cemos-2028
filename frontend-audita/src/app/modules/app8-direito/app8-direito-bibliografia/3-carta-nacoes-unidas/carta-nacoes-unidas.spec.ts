import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaNacoesUnidas } from './carta-nacoes-unidas';

describe('CartaNacoesUnidas', () => {
  let component: CartaNacoesUnidas;
  let fixture: ComponentFixture<CartaNacoesUnidas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaNacoesUnidas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaNacoesUnidas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
