import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App9Economia } from './app9-economia';

describe('App9Economia', () => {
  let component: App9Economia;
  let fixture: ComponentFixture<App9Economia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App9Economia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App9Economia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
