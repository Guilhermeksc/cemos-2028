import { ComponentFixture, TestBed } from '@angular/core/testing';

import { In3 } from './in3';

describe('In3', () => {
  let component: In3;
  let fixture: ComponentFixture<In3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [In3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(In3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
