import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App1IntendenciaResumo } from './app1-intendencia-resumo';

describe('App1IntendenciaResumo', () => {
  let component: App1IntendenciaResumo;
  let fixture: ComponentFixture<App1IntendenciaResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App1IntendenciaResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App1IntendenciaResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
