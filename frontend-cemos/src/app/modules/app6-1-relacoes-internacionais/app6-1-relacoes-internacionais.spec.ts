import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6RelacoesInternacionais } from './app6-1-relacoes-internacionais';

describe('App6RelacoesInternacionais', () => {
  let component: App6RelacoesInternacionais;
  let fixture: ComponentFixture<App6RelacoesInternacionais>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6RelacoesInternacionais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6RelacoesInternacionais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
