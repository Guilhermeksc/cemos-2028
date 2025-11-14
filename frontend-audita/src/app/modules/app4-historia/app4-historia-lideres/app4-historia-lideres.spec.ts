import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App4HistoriaLideres } from './app4-historia-lideres';

describe('App4HistoriaLideres', () => {
  let component: App4HistoriaLideres;
  let fixture: ComponentFixture<App4HistoriaLideres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App4HistoriaLideres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App4HistoriaLideres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
