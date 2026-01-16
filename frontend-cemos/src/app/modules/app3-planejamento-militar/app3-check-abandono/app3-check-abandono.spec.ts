import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App3CheckAbandono } from './app3-check-abandono';

describe('App3CheckAbandono', () => {
  let component: App3CheckAbandono;
  let fixture: ComponentFixture<App3CheckAbandono>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App3CheckAbandono]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App3CheckAbandono);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
