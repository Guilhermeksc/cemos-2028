import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2EstrategiaMedia } from './app2-estrategia-media';

describe('App2EstrategiaMedia', () => {
  let component: App2EstrategiaMedia;
  let fixture: ComponentFixture<App2EstrategiaMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App2EstrategiaMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App2EstrategiaMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
