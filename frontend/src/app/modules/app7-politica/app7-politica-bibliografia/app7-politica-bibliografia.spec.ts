import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App7PoliticaBibliografia } from './app7-politica-bibliografia';

describe('App7PoliticaBibliografia', () => {
  let component: App7PoliticaBibliografia;
  let fixture: ComponentFixture<App7PoliticaBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App7PoliticaBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App7PoliticaBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
