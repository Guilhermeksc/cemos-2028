import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Md30M012 } from './md-30-m-01-2';

describe('Md30M012', () => {
  let component: Md30M012;
  let fixture: ComponentFixture<Md30M012>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Md30M012]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Md30M012);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
