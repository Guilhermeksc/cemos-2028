import { ComponentFixture, TestBed } from '@angular/core/testing';

import { In98 } from './in98';

describe('In98', () => {
  let component: In98;
  let fixture: ComponentFixture<In98>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [In98]
    })
    .compileComponents();

    fixture = TestBed.createComponent(In98);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
