import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App8DireitoMedia } from './app8-direito-media/app8-direito-media';

describe('App8DireitoMedia', () => {
  let component: App8DireitoMedia;
  let fixture: ComponentFixture<App8DireitoMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App8DireitoMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App8DireitoMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
