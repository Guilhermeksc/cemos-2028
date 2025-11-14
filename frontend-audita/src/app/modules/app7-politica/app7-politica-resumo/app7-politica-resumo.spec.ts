import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App7PoliticaResumo } from './app7-politica-resumo';

describe('App7PoliticaResumo', () => {
  let component: App7PoliticaResumo;
  let fixture: ComponentFixture<App7PoliticaResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App7PoliticaResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App7PoliticaResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
