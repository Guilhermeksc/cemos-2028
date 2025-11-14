import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App7Politica } from './app7-politica';

describe('App7Politica', () => {
  let component: App7Politica;
  let fixture: ComponentFixture<App7Politica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App7Politica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App7Politica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
