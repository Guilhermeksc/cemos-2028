import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliografiaCompleta } from './bibliografia-completa';

describe('BibliografiaCompleta', () => {
  let component: BibliografiaCompleta;
  let fixture: ComponentFixture<BibliografiaCompleta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliografiaCompleta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliografiaCompleta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
