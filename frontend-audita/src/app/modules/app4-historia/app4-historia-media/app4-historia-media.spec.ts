import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App4HistoriaMedia } from './app4-historia-media/app4-historia-media';

describe('App4HistoriaMedia', () => {
  let component: App4HistoriaMedia;
  let fixture: ComponentFixture<App4HistoriaMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App4HistoriaMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App4HistoriaMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
