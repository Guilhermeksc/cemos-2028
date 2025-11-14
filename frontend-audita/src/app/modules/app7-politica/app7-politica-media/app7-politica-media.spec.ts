import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App7PoliticaMedia } from './app7-politica-media/app7-politica-media';

describe('App7PoliticaMedia', () => {
  let component: App7PoliticaMedia;
  let fixture: ComponentFixture<App7PoliticaMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App7PoliticaMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App7PoliticaMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
