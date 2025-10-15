import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App5InglesMedia } from './app5-ingles-media/app5-ingles-media';

describe('App5InglesMedia', () => {
  let component: App5InglesMedia;
  let fixture: ComponentFixture<App5InglesMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App5InglesMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App5InglesMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
