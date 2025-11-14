import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App8Direito } from './app8-direito';

describe('App8Direito', () => {
  let component: App8Direito;
  let fixture: ComponentFixture<App8Direito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App8Direito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App8Direito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
