import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App1IntendenciaBibliografia } from './app1-intendencia-bibliografia';

describe('App1IntendenciaBibliografia', () => {
  let component: App1IntendenciaBibliografia;
  let fixture: ComponentFixture<App1IntendenciaBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App1IntendenciaBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App1IntendenciaBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
