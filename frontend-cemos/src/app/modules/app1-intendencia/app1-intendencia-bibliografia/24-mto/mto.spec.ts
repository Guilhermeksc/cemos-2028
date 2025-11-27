import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mto } from './mto';

describe('Mto', () => {
  let component: Mto;
  let fixture: ComponentFixture<Mto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
