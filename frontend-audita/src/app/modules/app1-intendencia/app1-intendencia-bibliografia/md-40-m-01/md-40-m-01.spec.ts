import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Md40M01 } from './md-40-m-01';

describe('Md40M01', () => {
  let component: Md40M01;
  let fixture: ComponentFixture<Md40M01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Md40M01]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Md40M01);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
