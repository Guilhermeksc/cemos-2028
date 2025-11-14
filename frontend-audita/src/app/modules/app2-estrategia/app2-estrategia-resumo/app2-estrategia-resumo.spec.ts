import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2EstrategiaResumo } from './app2-estrategia-resumo';

describe('App2EstrategiaResumo', () => {
  let component: App2EstrategiaResumo;
  let fixture: ComponentFixture<App2EstrategiaResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App2EstrategiaResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App2EstrategiaResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
