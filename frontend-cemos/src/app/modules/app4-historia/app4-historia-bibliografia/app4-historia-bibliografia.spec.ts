import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App4HistoriaBibliografia } from './app4-historia-bibliografia';

describe('App4HistoriaBibliografia', () => {
  let component: App4HistoriaBibliografia;
  let fixture: ComponentFixture<App4HistoriaBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App4HistoriaBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App4HistoriaBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
