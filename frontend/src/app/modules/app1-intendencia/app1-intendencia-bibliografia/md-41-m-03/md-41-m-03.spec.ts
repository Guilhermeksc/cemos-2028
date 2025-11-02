import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Md41M03 } from './md-41-m-03';

describe('Md41M03', () => {
  let component: Md41M03;
  let fixture: ComponentFixture<Md41M03>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Md41M03]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Md41M03);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
