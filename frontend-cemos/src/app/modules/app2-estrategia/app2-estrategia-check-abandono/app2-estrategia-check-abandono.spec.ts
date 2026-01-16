import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2EstrategiaCheckAbandono } from './app2-estrategia-check-abandono';

describe('App2EstrategiaCheckAbandono', () => {
  let component: App2EstrategiaCheckAbandono;
  let fixture: ComponentFixture<App2EstrategiaCheckAbandono>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App2EstrategiaCheckAbandono]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App2EstrategiaCheckAbandono);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
