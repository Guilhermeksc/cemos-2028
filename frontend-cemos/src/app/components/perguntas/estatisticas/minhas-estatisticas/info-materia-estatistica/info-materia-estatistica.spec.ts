import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMateriaEstatistica } from './info-materia-estatistica';

describe('InfoMateriaEstatistica', () => {
  let component: InfoMateriaEstatistica;
  let fixture: ComponentFixture<InfoMateriaEstatistica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoMateriaEstatistica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoMateriaEstatistica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
