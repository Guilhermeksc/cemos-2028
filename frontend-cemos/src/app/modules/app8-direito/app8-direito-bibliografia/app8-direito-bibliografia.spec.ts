import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App8DireitoBibliografia } from './app8-direito-bibliografia';

describe('App8DireitoBibliografia', () => {
  let component: App8DireitoBibliografia;
  let fixture: ComponentFixture<App8DireitoBibliografia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App8DireitoBibliografia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App8DireitoBibliografia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
