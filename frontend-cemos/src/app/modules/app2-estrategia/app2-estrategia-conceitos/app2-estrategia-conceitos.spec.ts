import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2EstrategiaConceitos } from './app2-estrategia-conceitos';

describe('App2EstrategiaConceitos', () => {
  let component: App2EstrategiaConceitos;
  let fixture: ComponentFixture<App2EstrategiaConceitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App2EstrategiaConceitos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App2EstrategiaConceitos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
