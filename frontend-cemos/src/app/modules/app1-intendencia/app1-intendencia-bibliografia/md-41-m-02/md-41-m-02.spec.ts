import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Md41M02 } from './md-41-m-02';

describe('Md41M02', () => {
  let component: Md41M02;
  let fixture: ComponentFixture<Md41M02>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Md41M02]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Md41M02);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
