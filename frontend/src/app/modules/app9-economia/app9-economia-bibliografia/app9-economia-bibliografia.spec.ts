import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App9EconomiaBibliografia } from './app9-economia-bibliografia';

describe('App9EconomiaBibliografia', () => {
  let component: App9EconomiaBibliografia;
  let fixture: ComponentFixture<App9EconomiaBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App9EconomiaBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App9EconomiaBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
