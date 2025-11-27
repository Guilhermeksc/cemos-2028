import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sgm602 } from './sgm602';

describe('Sgm602', () => {
  let component: Sgm602;
  let fixture: ComponentFixture<Sgm602>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sgm602]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sgm602);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
