import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portaria223 } from './portaria223';

describe('Portaria223', () => {
  let component: Portaria223;
  let fixture: ComponentFixture<Portaria223>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portaria223]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portaria223);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
