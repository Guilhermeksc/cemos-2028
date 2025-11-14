import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App1Intendencia } from './app1-intendencia';

describe('App1Intendencia', () => {
  let component: App1Intendencia;
  let fixture: ComponentFixture<App1Intendencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App1Intendencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App1Intendencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
