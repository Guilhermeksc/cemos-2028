import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App4HistoriaResumo } from './app4-historia-resumo';

describe('App4HistoriaResumo', () => {
  let component: App4HistoriaResumo;
  let fixture: ComponentFixture<App4HistoriaResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App4HistoriaResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App4HistoriaResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
