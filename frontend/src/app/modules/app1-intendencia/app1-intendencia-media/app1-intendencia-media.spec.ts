import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App1IntendenciaMedia } from './app1-intendencia-media';

describe('App1IntendenciaMedia', () => {
  let component: App1IntendenciaMedia;
  let fixture: ComponentFixture<App1IntendenciaMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App1IntendenciaMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App1IntendenciaMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
