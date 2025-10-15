import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App5InglesBibliografia } from './app5-ingles-bibliografia/app5-ingles-bibliografia';

describe('App5InglesBibliografia', () => {
  let component: App5InglesBibliografia;
  let fixture: ComponentFixture<App5InglesBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App5InglesBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App5InglesBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
