import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App9EconomiaMedia } from './app9-economia-media';

describe('App9EconomiaMedia', () => {
  let component: App9EconomiaMedia;
  let fixture: ComponentFixture<App9EconomiaMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App9EconomiaMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App9EconomiaMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
