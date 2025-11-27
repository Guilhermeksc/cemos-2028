import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portaria15 } from './portaria15';

describe('Portaria15', () => {
  let component: Portaria15;
  let fixture: ComponentFixture<Portaria15>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portaria15]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portaria15);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
