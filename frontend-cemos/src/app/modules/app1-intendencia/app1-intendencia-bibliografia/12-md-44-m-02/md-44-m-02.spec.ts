import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Md44M02 } from './md-44-m-02';

describe('Md44M02', () => {
  let component: Md44M02;
  let fixture: ComponentFixture<Md44M02>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Md44M02]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Md44M02);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
