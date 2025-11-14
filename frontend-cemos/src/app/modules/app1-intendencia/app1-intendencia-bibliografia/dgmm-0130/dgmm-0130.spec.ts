import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dgmm0130 } from './dgmm-0130';

describe('Dgmm0130', () => {
  let component: Dgmm0130;
  let fixture: ComponentFixture<Dgmm0130>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dgmm0130]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dgmm0130);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
