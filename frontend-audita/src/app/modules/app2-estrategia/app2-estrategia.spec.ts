import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2Estrategia } from './app2-estrategia';

describe('App2Estrategia', () => {
  let component: App2Estrategia;
  let fixture: ComponentFixture<App2Estrategia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App2Estrategia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App2Estrategia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
