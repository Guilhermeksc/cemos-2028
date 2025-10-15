import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App5Ingles } from './app5-ingles';

describe('App5Ingles', () => {
  let component: App5Ingles;
  let fixture: ComponentFixture<App5Ingles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App5Ingles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App5Ingles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
