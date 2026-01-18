import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App3Simulados } from './app3-simulados';

describe('App3Simulados', () => {
  let component: App3Simulados;
  let fixture: ComponentFixture<App3Simulados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App3Simulados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App3Simulados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
