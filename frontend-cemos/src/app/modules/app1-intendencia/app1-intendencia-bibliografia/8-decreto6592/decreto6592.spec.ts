import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Decreto6592 } from './decreto6592';

describe('Decreto6592', () => {
  let component: Decreto6592;
  let fixture: ComponentFixture<Decreto6592>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Decreto6592]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Decreto6592);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
