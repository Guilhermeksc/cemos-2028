import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticaNacionalDefesa } from './politica-nacional-defesa';

describe('PoliticaNacionalDefesa', () => {
  let component: PoliticaNacionalDefesa;
  let fixture: ComponentFixture<PoliticaNacionalDefesa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticaNacionalDefesa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticaNacionalDefesa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
