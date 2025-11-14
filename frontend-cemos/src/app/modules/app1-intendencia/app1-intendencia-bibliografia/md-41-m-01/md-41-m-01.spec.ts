import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Md41M01 } from './md-41-m-01';

describe('Md41M01', () => {
  let component: Md41M01;
  let fixture: ComponentFixture<Md41M01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Md41M01]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Md41M01);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
