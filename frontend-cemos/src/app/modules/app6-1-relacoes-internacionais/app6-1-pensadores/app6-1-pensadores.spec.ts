import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App61Pensadores } from './app6-1-pensadores';

describe('App61Pensadores', () => {
  let component: App61Pensadores;
  let fixture: ComponentFixture<App61Pensadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App61Pensadores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(App61Pensadores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
