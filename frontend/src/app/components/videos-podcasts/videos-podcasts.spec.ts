import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosPodcasts } from './videos-podcasts';

describe('VideosPodcasts', () => {
  let component: VideosPodcasts;
  let fixture: ComponentFixture<VideosPodcasts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosPodcasts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosPodcasts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
