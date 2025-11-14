import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Md30M01 } from './md-30-m-01';

describe('Md30M01', () => {
  let component: Md30M01;
  let fixture: ComponentFixture<Md30M01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Md30M01]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Md30M01);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
