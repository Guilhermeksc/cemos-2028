import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituicaoBrasil } from './constituicao-brasil';

describe('ConstituicaoBrasil', () => {
  let component: ConstituicaoBrasil;
  let fixture: ComponentFixture<ConstituicaoBrasil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstituicaoBrasil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstituicaoBrasil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
