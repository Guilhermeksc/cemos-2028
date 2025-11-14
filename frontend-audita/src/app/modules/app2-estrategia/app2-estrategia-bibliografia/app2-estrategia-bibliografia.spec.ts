import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2EstrategiaBibliografia } from './app2-estrategia-bibliografia';

describe('App2EstrategiaBibliografia', () => {
  let component: App2EstrategiaBibliografia;
  let fixture: ComponentFixture<App2EstrategiaBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App2EstrategiaBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App2EstrategiaBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
