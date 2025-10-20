import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App6GeopoliticaRelacoesInternacionaisMedia } from './app6-geopolitica-relacoes-internacionais-media';

describe('App6GeopoliticaRelacoesInternacionaisMedia', () => {
  let component: App6GeopoliticaRelacoesInternacionaisMedia;
  let fixture: ComponentFixture<App6GeopoliticaRelacoesInternacionaisMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App6GeopoliticaRelacoesInternacionaisMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App6GeopoliticaRelacoesInternacionaisMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
