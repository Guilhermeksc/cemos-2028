import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App7PoliticaConceitos } from './app7-politica-conceitos';

describe('App7PoliticaConceitos', () => {
  let component: App7PoliticaConceitos;
  let fixture: ComponentFixture<App7PoliticaConceitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App7PoliticaConceitos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App7PoliticaConceitos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
