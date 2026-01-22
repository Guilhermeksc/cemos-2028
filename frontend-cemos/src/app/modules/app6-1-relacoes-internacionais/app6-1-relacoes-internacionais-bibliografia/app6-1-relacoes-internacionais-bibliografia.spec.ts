import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6RelacoesInternacionaisBibliografia } from './app6-1-relacoes-internacionais-bibliografia';

describe('App6RelacoesInternacionaisBibliografia', () => {
  let component: App6RelacoesInternacionaisBibliografia;
  let fixture: ComponentFixture<App6RelacoesInternacionaisBibliografia>;  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6RelacoesInternacionaisBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6RelacoesInternacionaisBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
