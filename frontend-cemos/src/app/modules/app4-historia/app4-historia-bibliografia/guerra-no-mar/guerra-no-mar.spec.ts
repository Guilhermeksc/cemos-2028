import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuerraNoMar } from './guerra-no-mar';

describe('GuerraNoMar', () => {
  let component: GuerraNoMar;
  let fixture: ComponentFixture<GuerraNoMar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuerraNoMar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuerraNoMar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
